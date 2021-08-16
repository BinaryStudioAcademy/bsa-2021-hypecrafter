import { Project } from '../../data/entities';
import { mapProjects } from '../../data/mappers/mapProjects';
import { ProjectRepository } from '../../data/repositories';

export default class ProjectService {
  readonly #projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.#projectRepository = projectRepository;
  }

  public async getPopularAndRecommended() {
    const popular = await this.#projectRepository.getPopular();
    const recommended = await this.#projectRepository.getRecommended();
    return {
      popular: mapProjects(popular),
      recommended: mapProjects(recommended)
    };
  }

  public async createProject(body: Project) {
    const project = await this.#projectRepository.save({ ...new Project(), ...body });
    return project;
  }
}
