import { DonateRepository } from '../../data/repositories';

export default class DonateService {
  readonly #donateRepository: DonateRepository;

  constructor(donateRepository: DonateRepository) {
    this.#donateRepository = donateRepository;
  }

  public getAll() {
    return this.#donateRepository.getAll();
  }

  public getById(id: string) {
    return this.#donateRepository.getById(id);
  }
}
