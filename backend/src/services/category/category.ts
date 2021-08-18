import { CategoryRepository } from '../../data/repositories';

export default class CategoryService {
  readonly #categoryepository: CategoryRepository;

  constructor(categoryepository: CategoryRepository) {
    this.#categoryepository = categoryepository;
  }

  public async getAll() {
    const popular = await this.#categoryepository.getAll();
    return popular;
  }
}
