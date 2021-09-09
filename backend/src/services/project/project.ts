import { ProjectsFilter, ProjectsSort, TimeInterval } from 'hypecrafter-shared/enums';
import { Project } from '../../common/types';
import {
  UpdateInteractionTimeQuery
} from '../../common/types/project';
import { Chat, Project as CreateProject, Team } from '../../data/entities';
import { mapPrivileges, mapProjects, mapBoolean, nullToNumber } from '../../data/mappers';
import { mapLikesAndDislikes } from '../../data/mappers/mapLikesAndDislikes';
import {
  CategoryRepository,
  ChatRepository,
  ProjectRepository,
  TagRepository,
  TeamRepository,
  UserRepository
} from '../../data/repositories';
import FAQServise from '../faq';
import DonatorsPrivilegeServise from '../projectPrivilege';
import ProjectTagService from '../projectTag';
import TagService from '../tag';
import { CustomError } from '../../helpers/customError';
import { HttpStatusCode } from '../../../../shared/build/enums';

export default class ProjectService {
  readonly #projectRepository: ProjectRepository;

  readonly #teamRepository: TeamRepository;

  readonly #chatRepository: ChatRepository;

  readonly #userRepository: UserRepository;

  readonly #categoryRepository: CategoryRepository;

  readonly #tagRepository: TagRepository;

  readonly #tagService: TagService;

  readonly #projectTagService: ProjectTagService;

  readonly #donatorsPrivilegeServise: DonatorsPrivilegeServise;

  readonly #faqServise: FAQServise;

  constructor(
    projectRepository: ProjectRepository,
    teamRepository: TeamRepository,
    chatRepository: ChatRepository,
    userRepository: UserRepository,
    tagService: TagService,
    projectTagService: ProjectTagService,
    categoryRepository: CategoryRepository,
    tagRepository: TagRepository,
    donatorsPrivilegeServise: DonatorsPrivilegeServise,
    faqServise: FAQServise
  ) {
    this.#projectRepository = projectRepository;
    this.#teamRepository = teamRepository;
    this.#chatRepository = chatRepository;
    this.#userRepository = userRepository;
    this.#categoryRepository = categoryRepository;
    this.#tagRepository = tagRepository;
    this.#tagService = tagService;
    this.#projectTagService = projectTagService;
    this.#donatorsPrivilegeServise = donatorsPrivilegeServise;
    this.#faqServise = faqServise;
  }

  public async getPopularProjectsByCategory(category: string) {
    const popular = await this.#projectRepository.getPopularProjectsByCategory(category);
    return popular;
  }

  public async getPopularAndRecommended() {
    const popular: Project[] = await this.#projectRepository.getPopular();
    const recommended: Project[] = await this.#projectRepository.getRecommended();

    return {
      popular: mapProjects(popular),
      recommended: mapProjects(recommended)
    };
  }

  public async createProject(body: CreateProject) {
    const project: CreateProject = await this.#projectRepository.save(body);
    const team = await this.#teamRepository.save({ ...new Team(), ...body.team, project });
    this.#chatRepository.save(body.team.chats.map(chat => ({ ...new Chat(), ...chat, team })));
    const listTags = await this.#tagService.save(body.projectTags.map(projectTag => projectTag.tag));
    await this.#projectTagService.remove(project.projectTags.map(projectTag => projectTag.id));
    await this.#projectTagService.save(listTags.map(tag => ({ tag, project })));
    await this.#donatorsPrivilegeServise.save(body.donatorsPrivileges.map(privilege => ({ ...privilege, project })));
    await this.#faqServise.save(body.faqs.map(faq => ({ ...faq, project })));
    return project;
  }

  public async getBySortAndFilter({ sort, filter, stringifiedCategories, userId, upcoming }: {
    sort: ProjectsSort,
    filter: ProjectsFilter,
    stringifiedCategories: string,
    upcoming: boolean,
    userId?: string,
  }) {
    const categories = JSON.parse(stringifiedCategories);
    const projects: Project[] = await this.#projectRepository.getBySortAndFilter({
      sort,
      filter,
      categories,
      userId,
      upcoming
    });
    return projects;
  }

  public async getById(id: string, userId: string | undefined) {
    const project = await this.#projectRepository.getById(id, userId);

    return {
      ...project,
      tags: mapBoolean(project.tags),
      involvementIndex: nullToNumber(project.involvementIndex),
      donated: nullToNumber(project.donated),
      privileges: mapPrivileges(project.privileges, project.bakersDonation),
      bakersAmount: nullToNumber(project.bakersAmount)
    }; // rewrite when error handling middleware works
  }

  public async getForEdit(id: string) {
    const project: CreateProject = await this.#projectRepository.getForEdit(id);
    return project;
  }

  public async setReaction({ isLiked, projectId }: { isLiked: boolean, projectId: string }, userId: string) {
    const project = await this.#projectRepository.findOne({ id: projectId });
    const user = await this.#userRepository.findOne({ id: userId });
    await this.#projectRepository.setReaction(isLiked, user, project);
    const likesAndDislikes: { likes: string, dislikes: string } = await this
      .#projectRepository.getLikesAndDislikesAmount(project.id);

    return mapLikesAndDislikes(likesAndDislikes);
  }

  public async setWatch({ isWatched, projectId }: { isWatched: boolean, projectId: string }, userId: string) {
    const project = await this.#projectRepository.findOne({ id: projectId });
    const user = await this.#userRepository.findOne({ id: userId });
    await this.#projectRepository.setWatch(isWatched, user, project);

    return { mess: 'Projected was wached or unwached' };
  }

  public async updateViewsAndInteractionTime({ id, interactionTime }:UpdateInteractionTimeQuery) {
    try {
      const { totalInteractionTime, totalViews } = await this.#projectRepository.getViewsAndInteractionTimeById(id);
      const response = await this.#projectRepository.updateViewsAndInteractionTimeById(
        id,
        {
          totalViews: !totalViews ? 1 : totalViews + 1,
          totalInteractionTime: !totalInteractionTime ? interactionTime : totalInteractionTime + interactionTime
        }
      );
      return {
        ...response,
        involvementIndex: nullToNumber(response.involvementIndex)
      };
    } catch {
      throw new CustomError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        'Views and interaction time not updated'
      );
    }
  }

  public async getRecommendation({
    stringifiedProjectTags,
    categoryId,
    region
  }: {
    stringifiedProjectTags?: string;
    categoryId?: string;
    region?: string;
  }) {
    const projectTagsId: string[] = JSON.parse(stringifiedProjectTags);

    const projectTags = projectTagsId.length > 0
      ? await Promise.all(
        projectTagsId.map(
          async (item): Promise<{ name: string }> => this.#tagRepository.getById(item)
        )
      )
      : null;

    let tagArray: string[] = [];
    if (projectTags) {
      projectTags.forEach((el: { name: string }) => el && tagArray.push(el.name));
    } else {
      tagArray = null;
    }

    const category = categoryId
      ? await this.#categoryRepository.getById(categoryId)
      : null;

    return await this.#projectRepository.getRecommendation(
      region,
      tagArray,
      category ? category.name : null
    );
  }

  public async getDonationInformation(id: string, startDate: TimeInterval) {
    const donationInformation = await this.#projectRepository.getDonationInformationDuringTime(
      id,
      startDate
    );
    const statisticsInformation = await this.#projectRepository.getProjectStatistics(id);
    return {
      donations: donationInformation,
      statistics: statisticsInformation
    };
  }
}
