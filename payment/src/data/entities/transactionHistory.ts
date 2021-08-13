import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract';

@Entity()
export class TransactionHistory extends AbstractEntity {
  @Column({ type: 'money' })
  public total: number;

  @Column({ type: 'money' })
  public balance: number;

  @Column()
  public userId: string;

  @Column()
  public type: string;

  @Column()
  public item: string;
}
