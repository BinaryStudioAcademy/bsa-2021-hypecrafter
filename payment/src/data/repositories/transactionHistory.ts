import { EntityRepository, Repository } from 'typeorm';
import { paginationStep } from '../../common/types';
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

  public async getByUserId(userId: string, pageNum: number) {
    const skipNum = (pageNum - 1) * paginationStep;
    const [page, count] = await this.createQueryBuilder().where(`"userId" = '${userId}'`).skip(skipNum).take(paginationStep).getManyAndCount();
    const isLast: boolean = count <= pageNum * paginationStep;
    return {
      isLast,
      page
    };
  }
}
