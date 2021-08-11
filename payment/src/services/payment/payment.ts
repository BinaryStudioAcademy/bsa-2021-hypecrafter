import { TransactionRepository } from '../../data/repositories';

export default class TransactionService {
  readonly #transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.#transactionRepository = transactionRepository;
  }

  public getAll() {
    return this.#transactionRepository.getAll();
  }

  public getById(id: string) {
    return this.#transactionRepository.getById(id);
  }

  public getByUserId(useId: string) {
    return this.#transactionRepository.getByUserId(useId);
  }
}
