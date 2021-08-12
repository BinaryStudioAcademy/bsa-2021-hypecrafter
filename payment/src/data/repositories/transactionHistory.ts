import { Repository, EntityRepository } from 'typeorm';
import { paginationStep, Payment } from '../../common/types';
import { TransactionHistory } from '../entities/transactionHistory';

@EntityRepository(TransactionHistory)
export class TransactionHistoryRepository extends Repository<TransactionHistory> {
  public getAll() {
    return this.find();
  }

  public getCountByUserId(userId: string) {
    return this.query(`SELECT COUNT(*) FROM "transaction_history" WHERE "userId" = '${userId}'`);
  }

  public getById(id: string) {
    return this.findOne({ id });
  }

  public async getByUserId(userId: string, pageNum: number) {
    const { count } = (await this.getCountByUserId(userId))[0];
    const page: Payment[] = await this.query(
      `SELECT * FROM "transaction_history" WHERE "userId" = '${userId}' OFFSET ${
        (pageNum - 1) * paginationStep
      } ROWS FETCH NEXT ${paginationStep} ROWS ONLY;`
    );
    const isLast: boolean = count <= pageNum * paginationStep;
    return {
      isLast,
      page
    };
  }
}
