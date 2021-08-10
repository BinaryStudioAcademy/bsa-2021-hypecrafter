import { UserRepository } from '../../data/repositories';

export default class UserService {
  readonly #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  public getAll() {
    return this.#userRepository.getAll();
  }

  public getById(id: string) {
    console.log('GET BY ID');
    return this.#userRepository.getById(id);
  }
}
