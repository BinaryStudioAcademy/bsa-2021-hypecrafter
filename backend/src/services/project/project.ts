import { ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import { Project } from '../../common/types';
import { Chat, Project as CreateProject, Team } from '../../data/entities';
import { mapPrivileges, mapProjects } from '../../data/mappers';
import { ChatRepository, ProjectRepository, TeamRepository } from '../../data/repositories';

export default class ProjectService {
  readonly #projectRepository: ProjectRepository;

  readonly #teamRepository: TeamRepository;

  readonly #chatRepository: ChatRepository;

  constructor(projectRepository: ProjectRepository, teamRepository: TeamRepository, chatRepository: ChatRepository) {
    this.#projectRepository = projectRepository;
    this.#teamRepository = teamRepository;
    this.#chatRepository = chatRepository;
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
    const project:CreateProject = await this.#projectRepository.save({ ...body });
    const team = await this.#teamRepository.save({ ...new Team(), ...body.team, project });
    this.#chatRepository.save(body.team.chats.map(chat => ({ ...new Chat(), ...chat, team })));
    return project;
  }

  public async getBySortAndFilter({ sort, filter, userId }: {
    sort: ProjectsSort,
    filter: ProjectsFilter,
    userId: string | undefined,
  }) {
    const projects: Project[] = await this.#projectRepository.getBySortAndFilter({ sort, filter, userId });
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
    await this.#projectRepository.setReaction(isLiked, userId, projectId);
    const likesAndDislikes:
    { likes: string, dislikes: string } = await this.#projectRepository.getLikesAndDislikesAmount(projectId);

    return likesAndDislikes;
  }

  public async setWatch({ isWatched, projectId }: { isWatched: boolean, projectId: string }, userId: string) {
    await this.#projectRepository.setWatch(isWatched, userId, projectId);

    return { mess: 'Projected was wached or unwached' };
  }
}
