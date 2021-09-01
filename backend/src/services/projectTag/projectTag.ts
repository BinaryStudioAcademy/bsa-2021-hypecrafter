import { Project, Tag } from '../../data/entities';
import { ProjectTagRepository } from '../../data/repositories';

export default class ProjectTagService {
  readonly #projectTagRepository: ProjectTagRepository;

  constructor(projectTagRepository: ProjectTagRepository) {
    this.#projectTagRepository = projectTagRepository;
  }

  public async save(listTags:{ tag:Tag, project:Project }[]) {
    const tags = this.#projectTagRepository.save(listTags);
    return tags;
  }
}
