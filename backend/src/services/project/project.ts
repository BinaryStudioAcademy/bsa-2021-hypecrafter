import { ProjectsCategories, ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import {
  Project,
  UpdateViewsAndInteractionTime,
  UpdateInteractionTimeQuery
} from '../../common/types';
import { Chat, Project as CreateProject, Team } from '../../data/entities';
import { mapPrivileges, mapProjects } from '../../data/mappers';
import { mapLikesAndDislikes } from '../../data/mappers/mapLikesAndDislikes';
import {
  ChatRepository, ProjectRepository,
  TeamRepository, UserRepository
} from '../../data/repositories';
import ProjectTagService from '../projectTag';
import TagService from '../tag';
import { CustomError } from '../../helpers/customError';
import { HttpStatusCode } from '../../../../shared/build/enums';

export default class ProjectService {
  readonly #projectRepository: ProjectRepository;

  readonly #teamRepository: TeamRepository;

  readonly #chatRepository: ChatRepository;

  readonly #userRepository: UserRepository;

  readonly #tagService: TagService;

  readonly #projectTagService: ProjectTagService;

  constructor(projectRepository: ProjectRepository, teamRepository: TeamRepository,
    chatRepository: ChatRepository, userRepository: UserRepository,
    tagService: TagService, projectTagService: ProjectTagService) {
    this.#projectRepository = projectRepository;
    this.#teamRepository = teamRepository;
    this.#chatRepository = chatRepository;
    this.#userRepository = userRepository;
    this.#tagService = tagService;
    this.#projectTagService = projectTagService;
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
    const project: CreateProject = await this.#projectRepository.save({ ...body });
    const team = await this.#teamRepository.save({ ...new Team(), ...body.team, project });
    this.#chatRepository.save(body.team.chats.map(chat => ({ ...new Chat(), ...chat, team })));
    const listTags = await this.#tagService.save(body.projectTags.map(projectTag => projectTag.tag));
    await this.#projectTagService.save(listTags.map(tag => ({ tag, project })));
    return project;
  }

  public async getBySortAndFilter({ sort, filter, category, userId }: {
    sort: ProjectsSort,
    filter: ProjectsFilter,
    category: ProjectsCategories,
    userId?: string,
  }) {
    const projects: Project[] = await this.#projectRepository.getBySortAndFilter({ sort, filter, category, userId });
    return projects;
  }

  public async getById(id: string, userId: string | undefined) {
    const project = await this.#projectRepository.getById(id, userId);
    project.bakersAmount = Math.max(0, project.bakersAmount);
    project.donated = Math.max(0, project.donated);
    project.privileges = mapPrivileges(project.privileges, project.bakersDonation);

    return project; // rewrite when error handling middleware works
  }

  public async setReaction({ isLiked, projectId }: { isLiked: boolean, projectId: string }, userId: string) {
    const project = await this.#projectRepository.findOne({ id: projectId });
    const user = await this.#userRepository.findOne({ id: userId });
    await this.#projectRepository.setReaction(isLiked, user, project);
    const likesAndDislikes:
    { likes: string, dislikes: string } = await this.#projectRepository.getLikesAndDislikesAmount(project.id);

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
          totalViews: totalViews + 1,
          totalInteractionTime: totalInteractionTime + interactionTime
        }
      ) as unknown as UpdateViewsAndInteractionTime;
      return response;
    } catch {
      throw new CustomError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        'Views and interaction time not updated'
      );
    }
  }
}
