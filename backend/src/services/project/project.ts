
import { Project } from '../../common/types';
import { Chat, Project as CreateProject, Team } from '../../data/entities';
import { ChatRepository, ProjectRepository, TeamRepository } from '../../data/repositories';
import { mapProjects } from '../../data/mappers';

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
    const project = await this.#projectRepository.save({ ...new CreateProject(), ...body });
    const team = await this.#teamRepository.save({ ...new Team(), ...body.team, project });
    this.#chatRepository.save(body.team.chats.map(chat => ({ ...new Chat(), ...chat, team })));
    project.team = team;
    return project;
  }

  public async getById(id: string) {
    const project = await this.#projectRepository.getById(id);
    project.bakersAmount = Math.max(0, project.bakersAmount);
    project.donated = Math.max(0, project.donated);
    return project; // rewrite when error handling middleware works
  }
}
