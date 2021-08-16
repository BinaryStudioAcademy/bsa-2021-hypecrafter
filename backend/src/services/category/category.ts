import { CategoryRepository } from '../../data/repositories';

export default class UserService {
  readonly #categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.#categoryRepository = categoryRepository;
  }

  public getAll() {
    return this.#categoryRepository.getAll();
  }
}
