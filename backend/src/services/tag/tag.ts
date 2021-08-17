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
}
