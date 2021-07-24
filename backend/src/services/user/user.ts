import { UserRepository } from '../../data/repositories';

export default class UserService {
  readonly #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  public getAll() {
    return this.#userRepository.getAll();
  }

  public getById(id: number) {
    return this.#userRepository.getById(id);
  }
}
