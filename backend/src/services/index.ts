import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../data/repositories/user';
import UserService from './user';

export function initServices() {
  return {
    userService: new UserService(getCustomRepository(UserRepository))
  };
}

export interface Services {
  userService: UserService;
}
