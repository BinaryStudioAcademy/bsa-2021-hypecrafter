/* eslint-disable no-console */
import { HttpStatusCode } from '../../../../shared/build/enums';
import { UserProfile } from '../../common/types';
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

  public async getCurrentUser(id: string) {
    console.log(await this.#userRepository.getCurrentUser(id));
    return this.#userRepository.getCurrentUser(id);
  }

  public async registerUser({ data, tokens }: RegisterReqBody) {
    try {
      await this.#userRepository.createUser(data);
      return tokens;
    } catch {
      throw new CustomError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        'User not created'
      );
    }
  }

  public createUser(data: RegisterData) {
    return this.#userRepository.createUser(data);
  }

  public replenishment(id:string, amount: number) {
    return this.#userRepository.replenishmentBalance(id, amount);
  }

  public updateById({ id, data }:{ id: string, data: UserProfile }) {
    try {
      return this.#userRepository.updateUserById(id, data);
    } catch {
      throw new CustomError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        'User not updated'
      );
    }
  }
}
