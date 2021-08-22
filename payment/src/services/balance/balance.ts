import { BalanceRepository } from '../../data/repositories';

export default class BalanceService {
  readonly #balanceRepository: BalanceRepository;

  constructor(balanceRepository: BalanceRepository) {
    this.#balanceRepository = balanceRepository;
  }

  public createNewBalance(userId: string) {
    return this.#balanceRepository.createNewBalance(userId);
  }
}
