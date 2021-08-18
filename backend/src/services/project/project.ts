import { ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
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

  public async getBySortAndFilter({ sort, filter }: { sort: ProjectsSort, filter: ProjectsFilter }) {
    const projects = await this.#projectRepository.getBySortAndFilter({ sort, filter });
    return projects;
  }

  public async getById(id: string) {
    const project = await this.#projectRepository.getById(id);
    return project[0]; // rewrite when error handling middleware works
  }
}
