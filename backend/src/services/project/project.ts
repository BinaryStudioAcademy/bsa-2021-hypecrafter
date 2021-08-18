import { Project } from '../../common/types';
import { Chat, Project as CreateProject, Team } from '../../data/entities';
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

  public async getPopularAndRecommended() {
    const popular: Project[] = await this.#projectRepository.getPopular();
    const recommended: Project[] = await this.#projectRepository.getRecommended();
    return {
      popular,
      recommended
    };
  }

  public async createProject(body: CreateProject) {
    const project = await this.#projectRepository.save({ ...new CreateProject(), ...body });
    const team = await this.#teamRepository.save({ ...new Team(), ...body.team, project });
    body.team.chats.forEach(chat => {
      this.#chatRepository.save({ ...new Chat(), ...chat, team });
    });
    project.team = team;
    return project;
  }

  public async getById(id: string) {
    const project = await this.#projectRepository.getById(id);
    return project[0]; // rewrite when error handling middleware works
  }
}
