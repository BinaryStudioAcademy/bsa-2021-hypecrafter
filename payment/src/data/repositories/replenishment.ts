import { Repository, EntityRepository } from 'typeorm';
import { Replenishment } from '../entities/replenishment';

@EntityRepository(Replenishment)
export class TransactionRepository extends Repository<Replenishment> {
  public getAll() {
    return this.find();
  }

  public getById(id: string) {
    return this.findOne({ id });
  }

  public getByUserId(userId: string) {
    return this.findOne({ userId });
  }
}
