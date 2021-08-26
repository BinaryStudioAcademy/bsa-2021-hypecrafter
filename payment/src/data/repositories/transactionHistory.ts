import { EntityRepository, Repository } from 'typeorm';
import { paginationStep, Transaction } from '../../common/types';
import { TransactionHistory } from '../entities/transactionHistory';

@EntityRepository(TransactionHistory)
export class TransactionHistoryRepository extends Repository<TransactionHistory> {
  public getAll() {
    return this.find();
  }

  public getCountByUserId(userId: string) {
    return this.createQueryBuilder().where(`"userId" = '${userId}'`).getCount();
  }

  public getById(id: string) {
    return this.findOne({ id });
  }

  public setTransaction(transaction: Transaction) {
    const newTransaction = new TransactionHistory();
    newTransaction.balance = transaction.balance;
    newTransaction.item = transaction.item;
    newTransaction.total = transaction.total;
    newTransaction.type = transaction.type;
    newTransaction.userId = transaction.userId;
    return this.save(newTransaction);
  }

  public async getByUserId(userId: string, pageNum: number) {
    const skipNum = (pageNum - 1) * paginationStep;
    const count = await this.getCountByUserId(userId);
    const page = await this.createQueryBuilder('transactionHistory')
      .select(['"createdAt"', 'item', 'type', 'total', 'balance'])
      .where(`"userId" = '${userId}'`).skip(skipNum)
      .take(paginationStep)
      .getRawMany();
    const isLast: boolean = count <= pageNum * paginationStep;
    return {
      isLast,
      page
    };
  }
}
