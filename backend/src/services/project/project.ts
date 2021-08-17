import { mapProjects } from '../../data/mappers/mapProjects';
import { ProjectRepository } from '../../data/repositories';

export default class ProjectService {
  readonly #projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this.#projectRepository = projectRepository;
  }

  public async getPopularProjectsByCategory(category: string) {
    const popular = await this.#projectRepository.getPopularProjectsByCategory(category);
    return popular;
  }

  public async getPopularAndRecommended() {
    const popular = await this.#projectRepository.getPopular();
    const recommended = await this.#projectRepository.getRecommended();
    return {
      popular: mapProjects(popular),
      recommended: mapProjects(recommended)
    };
  }
}
