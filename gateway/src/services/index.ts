import AuthService from "./auth";
import { Repositories } from "../data/repositories";

export function initServices(repositories: Repositories): Services {
  return {
    authService: new AuthService(repositories.refreshTokenRepository),
  };
}

export type Services = {
  authService: AuthService;
};
