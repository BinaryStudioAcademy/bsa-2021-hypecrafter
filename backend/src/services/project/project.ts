import { Project } from '../../common/types';
import { ProjectRepository } from '../../data/repositories';

export default class ProjectService {
  readonly #projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.#projectRepository = projectRepository;
  }

  public async getPopularAndRecommended() {
    const popular: Project[] = await this.#projectRepository.getPopular();
    const recommended: Project[] = await this.#projectRepository.getRecommended();
    return {
      popular,
      recommended
    };
  }

  public async createProject(body: Project) {
    const project = await this.#projectRepository.save({ ...new Project(), ...body });
    return project;
  }

  public async getById(id: string) {
    const project = await this.#projectRepository.getById(id);
    return project[0];
  }
}
