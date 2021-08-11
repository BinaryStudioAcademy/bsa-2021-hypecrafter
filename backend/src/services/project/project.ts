import { Project } from '../../common/types';
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
      popular: popular.map((it: Project) => ({ ...it, tags: it.tags.split(',') })),
      recommended: recommended.map((it: Project) => ({ ...it, tags: (it.tags).split(',') }))
    };
  }
}
