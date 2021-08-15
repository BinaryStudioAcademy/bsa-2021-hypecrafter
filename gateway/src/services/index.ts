import { Repositories } from '../data/repositories';
import AuthService from './auth';

export function initServices(repositories: Repositories): Services {
  return {
    authService: new AuthService(repositories.refreshTokenRepository, repositories.userRepository)
  };
}

export type Services = {
  authService: AuthService;
};
