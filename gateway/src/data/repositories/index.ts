import { getCustomRepository } from "typeorm";
import { UserRepository } from "./user";
import { RefreshTokenRepository } from "./refreshToken";

export const initRepositories = (): Repositories => ({
  userRepository: getCustomRepository(UserRepository),
  refreshTokenRepository: getCustomRepository(RefreshTokenRepository),
});

export type Repositories = {
  userRepository: UserRepository;
  refreshTokenRepository: RefreshTokenRepository;
};
