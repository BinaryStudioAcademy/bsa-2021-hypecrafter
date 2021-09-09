import { ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import { HttpMethod } from '../../common/enums';
import { Project } from '../../common/types';
import { Project as CreateProject, Team, TeamUsers } from '../../data/entities';
import { mapPrivileges, mapProjects } from '../../data/mappers';
import { mapLikesAndDislikes } from '../../data/mappers/mapLikesAndDislikes';
import {
  ProjectRepository,
  TeamRepository, TeamUserRepository, UserRepository
} from '../../data/repositories';
import { env } from '../../env';
import { sendRequest } from '../../helpers/http';
import FAQServise from '../faq';
import DonatorsPrivilegeServise from '../projectPrivilege';
import ProjectTagService from '../projectTag';
import TagService from '../tag';

export default class ProjectService {
  readonly #projectRepository: ProjectRepository;

  readonly #teamRepository: TeamRepository;

  readonly #teamUserRepository: TeamUserRepository;

  readonly #userRepository: UserRepository;

  readonly #tagService: TagService;

  readonly #projectTagService: ProjectTagService;

  readonly #donatorsPrivilegeServise: DonatorsPrivilegeServise;

  readonly #faqServise: FAQServise;

  constructor(projectRepository: ProjectRepository, teamRepository: TeamRepository,
    teamUserRepository: TeamUserRepository, userRepository: UserRepository,
    tagService: TagService, projectTagService: ProjectTagService,
    donatorsPrivilegeServise:DonatorsPrivilegeServise, faqServise:FAQServise) {
    this.#projectRepository = projectRepository;
    this.#teamRepository = teamRepository;
    this.#teamUserRepository = teamUserRepository;
    this.#userRepository = userRepository;
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
    await this.#teamUserRepository.save(body.team.teamUsers
      .map(teamUser => ({ ...new TeamUsers(), ...teamUser, team })));
    const listTags = await this.#tagService.save(body.projectTags.map(projectTag => projectTag.tag));
    if (project.projectTags.length > 0) {
      await this.#projectTagService
        .remove(project.projectTags.map(projectTag => projectTag.id));
    }
    await this.#projectTagService.save(listTags.map(tag => ({ tag, project })));
    await this.#donatorsPrivilegeServise.save(body.donatorsPrivileges.map(privilege => ({ ...privilege, project })));
    await this.#faqServise.save(body.faqs.map(faq => ({ ...faq, project })));
    this.addIndex(project);
    return project;
  }

  public async getBySortAndFilter({ sort, filter, stringifiedCategories, userId }: {
    sort: ProjectsSort,
    filter: ProjectsFilter,
    stringifiedCategories: string,
    userId?: string,
  }) {
    const categories = JSON.parse(stringifiedCategories);
    const projects: Project[] = await this.#projectRepository.getBySortAndFilter({ sort, filter, categories, userId });
    return projects;
  }

  public async getById(id: string, userId: string | undefined) {
    const project = await this.#projectRepository.getById(id, userId);
    project.bakersAmount = Math.max(0, project.bakersAmount);
    project.donated = Math.max(0, project.donated);
    project.privileges = mapPrivileges(project.privileges, project.bakersDonation);

    return project; // rewrite when error handling middleware works
  }

  public async getForEdit(id: string) {
    const project: CreateProject = await this.#projectRepository.getForEdit(id);
    return project;
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

  private addIndex = (params: CreateProject):void => {
    const body = JSON.parse(JSON.stringify(params));
    const result = Object.keys(body)
      .reduce((prev, current) => ({ ...prev, [current.toLowerCase()]: body[current] }), {});
    sendRequest(env.app.search.urlDocuments
      || 'https://hypecrafter.ent.us-central1.gcp.cloud.es.io/api/as/v1/engines/hypecrafter/documents',
    HttpMethod.POST,
    result,
    { Authorization: `Bearer ${env.app.search.privateKey}` });
  };
}
