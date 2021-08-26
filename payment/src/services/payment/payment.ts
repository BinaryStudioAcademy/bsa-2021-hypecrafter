import { Transaction } from '../../common/types';
import { TransactionHistoryRepository } from '../../data/repositories';

export default class TransactionService {
  readonly #transactionHistoryRepository: TransactionHistoryRepository;

  constructor(transactionHistoryRepository: TransactionHistoryRepository) {
    this.#transactionHistoryRepository = transactionHistoryRepository;
  }

  public getAll() {
    return this.#transactionHistoryRepository.getAll();
  }

  public getById(id: string) {
    return this.#transactionHistoryRepository.getById(id);
  }

  public setTransaction(transaction: Transaction) {
    return this.#transactionHistoryRepository.setTransaction(transaction);
  }

  public getByUserId(userId: string, pageNum: number) {
    return this.#transactionHistoryRepository.getByUserId(userId, pageNum);
  }
}
