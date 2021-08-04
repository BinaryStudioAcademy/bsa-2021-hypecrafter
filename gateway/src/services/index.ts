/*import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../data/repositories/user';
import { RefreshTokenRepository } from '../data/repositories/refreshToken';
import UserService from './user';
import RefreshTokenService from './refreshToken';

export function initServices() {
  return {
    userService: new UserService(getCustomRepository(UserRepository)),
    refreshTokenService: new RefreshTokenService(
      getCustomRepository(RefreshTokenRepository)
    )
  };
}

export interface Services {
  userService: UserService;
  refreshTokenService: RefreshTokenService;
}*/
import UserService from "./user";
import RefreshTokenService from "./refreshToken";
import { Repositories } from "../data/repositories";

export function initServices(_repositories: Repositories): Services {
  return {
    userService: new UserService(_repositories.userRepository),
    refreshTokenService: new RefreshTokenService(_repositories.refreshRepository)
  };
}

// export type Services = Record<string, unknown>;
export type Services = { userService: UserService, refreshTokenService: RefreshTokenService };
