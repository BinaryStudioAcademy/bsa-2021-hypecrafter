import { Project } from '../../data/entities';
import { DonateRepository, ProjectRepository, UserRepository } from '../../data/repositories';

export default class DonateService {
  readonly #donateRepository: DonateRepository;

  readonly #userRepository: UserRepository;

  readonly #projectRepository: ProjectRepository;

  constructor(donateRepository: DonateRepository,
    projectRepository: ProjectRepository,
    userRepository: UserRepository) {
    this.#donateRepository = donateRepository;
    this.#userRepository = userRepository;
    this.#projectRepository = projectRepository;
  }

  public async createDonate(amount: number, userId: string, projectId: string) {
    const user = await this.#userRepository.getById(userId);
    const project = await this.#projectRepository.getById(projectId);

    return this.#donateRepository.createDonate({ amount, user, project: Object.assign(new Project(), project) });
  }
}
