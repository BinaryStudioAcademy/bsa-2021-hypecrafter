import { Repositories } from '../data/repositories';

export function initServices(_repositories: Repositories): Services {
  return {};
}

export type Services = Record<string, unknown>;
