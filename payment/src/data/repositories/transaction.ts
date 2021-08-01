import { Repository, EntityRepository } from 'typeorm';
import { Transaction } from '../entities/transaction';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  public getAll() {
    return this.find();
  }

  public getById(id: string) {
    return this.findOne({ id });
  }
}
