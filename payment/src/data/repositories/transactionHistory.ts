import { EntityRepository, Repository } from 'typeorm';
import { paginationStep, Payment } from '../../common/types';
import { TransactionHistory } from '../entities/transactionHistory';

@EntityRepository(TransactionHistory)
export class TransactionHistoryRepository extends Repository<TransactionHistory> {
  public getAll() {
    return this.find();
  }

  public getCountByUserId(userId: string) {
    // return this.query(`SELECT COUNT(*) FROM "transaction_history" WHERE "userId" = '${userId}'`);
    return this.createQueryBuilder().where(`"userId" = '${userId}'`).getCount();
  }

  public getById(id: string) {
    return this.findOne({ id });
  }

  public async getByUserId(userId: string, pageNum: number) {
    const count = await this.getCountByUserId(userId);
    const skipNum = (pageNum - 1) * paginationStep;
    const page : Payment[] = await this.createQueryBuilder().where(`"userId" = '${userId}'`).skip(skipNum).take(paginationStep).getMany();

    const isLast: boolean = count <= pageNum * paginationStep;
    return {
      isLast,
      page
    };
  }
}
