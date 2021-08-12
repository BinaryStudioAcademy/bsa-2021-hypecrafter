import jwtDecode from 'jwt-decode';
import { TransactionHistoryRepository } from '../../data/repositories';
import { TokenPayload } from '../../common/types';

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

  public getByToken(token: string, pageNum: number) {
    const decoded = <TokenPayload>jwtDecode(token);
    const { userId } = decoded;

    return this.#transactionHistoryRepository.getByUserId(userId, pageNum);
  }
}
