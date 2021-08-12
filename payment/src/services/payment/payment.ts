import { TransactionHistoryRepository } from '../../data/repositories';

export default class TransactionService {
  readonly #transactionHistoryRepository: TransactionHistoryRepository;

  constructor(transactionHistoryRepository: TransactionHistoryRepository) {
    this.#transactionHistoryRepository = transactionHistoryRepository;
  }

  public getAll() {
    return this.#transactionHistoryRepository.getAll();
  }

  public getCount(useId: string) {
    return this.#transactionHistoryRepository.getCountByUserId(useId);
  }

  public getById(id: string) {
    return this.#transactionHistoryRepository.getById(id);
  }

  public getByUserId(useId: string) {
    return this.#transactionHistoryRepository.getByUserId(useId);
  }
}
