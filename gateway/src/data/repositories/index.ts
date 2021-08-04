import { getCustomRepository } from 'typeorm';
import { UserRepository } from './user';

export const initRepositories = () : Repositories => ({
  userRepository: getCustomRepository(UserRepository)
});

export type Repositories = { userRepository: UserRepository };
