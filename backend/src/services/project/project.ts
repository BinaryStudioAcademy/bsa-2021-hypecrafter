
import { Project } from '../../common/types';
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
    const popular: Project[] = await this.#projectRepository.getPopular();
    const recommended: Project[] = await this.#projectRepository.getRecommended();
    return {
      popular: mapProjects(popular),
      recommended: mapProjects(recommended)
    };
  }

  public async getById(id: string) {
    const project = await this.#projectRepository.getById(id);

    return project[0]; // rewrite when error handling middleware works
  }
}
