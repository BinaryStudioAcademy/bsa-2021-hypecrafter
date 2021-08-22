import { EntityRepository, Repository } from 'typeorm';
import { Balance } from '../entities/balance';

@EntityRepository(Balance)
export class BalanceRepository extends Repository<Balance> {
  public createNewBalance(userId: string) {
    const newBalance = new Balance();
    newBalance.balance = 0;
    newBalance.userId = userId;
    return this.save(newBalance);
  }
}
