import { UserRepository } from "../../data/repositories";

export default class UserService {
  readonly #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  public getAll() {
    return this.#userRepository.getAll();
  }

  public getById(id: string) {
    return this.#userRepository.getById(id);
  }

  public createUser(data: {
    region: string;
    phoneNumber: string;
    gender: string;
    birthday: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) {
    return this.#userRepository.createUser(data);
  }
}
