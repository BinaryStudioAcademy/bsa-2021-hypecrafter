import UserService from "./user";
import RefreshTokenService from "./refreshToken";
import { Repositories } from "../data/repositories";

export function initServices(_repositories: Repositories): Services {
  return {
    userService: new UserService(_repositories.userRepository),
    refreshTokenService: new RefreshTokenService(_repositories.refreshRepository)
  };
}

export type Services = { userService: UserService, refreshTokenService: RefreshTokenService };
