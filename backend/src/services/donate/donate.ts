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

  /* eslint-disable */
  public async createDonate(amount: number, userId: string, projectId: string) {
    try {
      const user = await this.#userRepository.getById(userId);
      const project = await this.#projectRepository.getById(projectId);
      if (!user || !project) {
        throw Error("User or Project doesn't exist");
      }
      const currentProject = Object.assign(new Project(), project);

      if (currentProject.finishDate.getTime() < Date.now()
      || currentProject.startDate.getTime() > Date.now()) { 
        throw Error("Time for donate is not started or already finished"); }
      if (user.balance < amount) { throw Error("User doesn't have enough money"); }
      await this.#userRepository.deductBalance(userId, amount);
      return await this.#donateRepository.createDonate({ amount, user, project: currentProject });
    } catch (err) {
      console.log(err);
    }finally{
      // @ts-ignore
      return;
    }
  }
}
