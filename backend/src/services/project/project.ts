import { Project } from '../../common/types';
import { mapProjects } from '../../data/mappers';
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
      popular: mapProjects(popular),
      recommended: mapProjects(recommended)
    };
  }

  public async getById(id: string) {
    const project = (await this.#projectRepository.getById(id))[0];
    project.bakersAmount = Math.max(0, project.bakersAmount);
    project.donated = Math.max(0, project.donated);
    return project; // rewrite when error handling middleware works
  }
}
