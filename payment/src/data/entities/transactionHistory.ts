import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract';

@Entity()
export class TransactionHistory extends AbstractEntity {
  @Column({ type: 'numeric' })
  public total: number;

  @Column({ type: 'numeric' })
  public balance: number;

  @Column()
  public userId: string;

  @Column()
  public type: string;

  @Column()
  public item: string;
}
