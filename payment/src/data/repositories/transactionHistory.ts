import { Repository, EntityRepository } from 'typeorm';
import { TransactionHistory as transaction_history} from '../entities/transactionHistory';

@EntityRepository(transaction_history)
export class TransactionHistoryRepository extends Repository<transaction_history> {
  public getAll() {
    return this.find();
  }
  public getCountByUserId(userId: string){
    console.log()
    return this.queryRunner.query(`SELECT COUNT(*) FROM "transaction_history" WHERE userId = '${userId}'`)
  }
  public getById(id: string) {
    return this.findOne({ id });
  }

  public getByUserId(userId: string) {
    return this.queryRunner.query(`SELECT * FROM "transaction_history" WHERE userId = '${userId}'`);
  }
}
