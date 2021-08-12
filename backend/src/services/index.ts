import UserService from './user';
import { Repositories } from '../data/repositories';

export function initServices(repositories: Repositories): Services {
  return {
    userService: new UserService(repositories.userRepository)
  };
}

export type Services = { userService: UserService }