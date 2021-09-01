import { Tag } from '../../data/entities';
import { TagRepository } from '../../data/repositories';

export default class TagService {
  readonly #tagRepository: TagRepository;

  constructor(tagRepository: TagRepository) {
    this.#tagRepository = tagRepository;
  }

  public async getPopular() {
    const popular = await this.#tagRepository.getPopular();
    return popular;
  }

  public async getAll() {
    const tags = await this.#tagRepository.getAll();
    return tags;
  }

  public async save(projectTags:Tag[]) {
    const tags = await this.#tagRepository.save(projectTags);
    return tags;
  }
}
