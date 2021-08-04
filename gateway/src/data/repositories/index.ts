import { getCustomRepository } from "typeorm";
import { UserRepository } from "./user";
import { RefreshTokenRepository } from "./refreshToken";

export const initRepositories = (): Repositories => ({
  userRepository: getCustomRepository(UserRepository),
  refreshRepository: getCustomRepository(RefreshTokenRepository),
});

export type Repositories = {
  userRepository: UserRepository;
  refreshRepository: RefreshTokenRepository;
};
