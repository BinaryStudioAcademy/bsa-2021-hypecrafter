import { getCustomRepository } from 'typeorm';
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
}
