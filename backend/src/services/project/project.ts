import { Project as Application, ProjectsCategories, ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { NotificationMessageTypes } from '../../common/enums/notificationTypes';
import { Project } from '../../common/types';
import { Chat, Project as CreateProject, Team } from '../../data/entities';
import { mapPrivileges, mapProjects } from '../../data/mappers';
import { mapLikesAndDislikes } from '../../data/mappers/mapLikesAndDislikes';
import {
  ChatRepository, ProjectRepository,
  TeamRepository, UserRepository
} from '../../data/repositories';
import ProjectTagService from '../projectTag';
import TagService from '../tag';

export default class ProjectService {
  readonly #projectRepository: ProjectRepository;

  readonly #teamRepository: TeamRepository;

  readonly #chatRepository: ChatRepository;

  readonly #userRepository: UserRepository;

  readonly #tagService: TagService;

  readonly #projectTagService: ProjectTagService;

  readonly #app: MicroMq;

  constructor(projectRepository: ProjectRepository, teamRepository: TeamRepository,
    chatRepository: ChatRepository, userRepository: UserRepository,
    tagService: TagService, projectTagService: ProjectTagService, app: MicroMq) {
    this.#projectRepository = projectRepository;
    this.#teamRepository = teamRepository;
    this.#chatRepository = chatRepository;
    this.#userRepository = userRepository;
    this.#tagService = tagService;
    this.#projectTagService = projectTagService;
    this.#app = app;
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

    const { finishDate, id } = project;

    await this.#app.ask('notification', {
      server: {
        action: 'new_project',
        meta: {
          finishDate,
          projectId: id
        },
      },
    });
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
    const { likes: oldLikes } = await this.#projectRepository.getLikesAndDislikesAmount(project.id);

    const user = await this.#userRepository.findOne({ id: userId });
    await this.#projectRepository.setReaction(isLiked, user, project);
    const likesAndDislikes:
    { likes: string, dislikes: string } = await this.#projectRepository.getLikesAndDislikesAmount(project.id);
    const { likes } = likesAndDislikes;

    if (oldLikes < likes) {
      const LikedProject = await this.#projectRepository.getProjectById(projectId);
      const { authorId: recipient } = LikedProject;

      await this.#app.ask(Application.NOTIFICATION, {
        server: {
          action: NotificationMessageTypes.LIKE,
          meta: {
            userId,
            projectId,
            recipient
          },
        },
      });
    }

    return mapLikesAndDislikes(likesAndDislikes);
  }

  getUsersWatchingProject(projectId: string) {
    return this.#projectRepository.getUsersByWatсhedProject(projectId);
  }

  public async setWatch({ isWatched, projectId }: { isWatched: boolean, projectId: string }, userId: string) {
    const project = await this.#projectRepository.findOne({ id: projectId });
    const user = await this.#userRepository.findOne({ id: userId });
    await this.#projectRepository.setWatch(isWatched, user, project);

    return { mess: 'Projected was wached or unwached' };
  }
}
