import { HttpStatusCode } from '../../../../shared/build/enums';
import { RegisterData, RegisterReqBody } from '../../common/types/registration/registration';
import { UserRepository } from '../../data/repositories';
import { CustomError } from '../../helpers/customError';

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

  public async registerUser({ data, tokens }: RegisterReqBody) {
    try {
      await this.#userRepository.createUser(data);
      return tokens;
    } catch (err) {
      throw new CustomError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        'User not created'
      );
    }
  }

  public createUser(data: RegisterData) {
    return this.#userRepository.createUser(data);
  }
}
