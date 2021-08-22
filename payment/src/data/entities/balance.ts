import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract';

@Entity()
export class Balance extends AbstractEntity {
  @Column({ type: 'money' })
  public balance: number;

  @Column()
  public userId: string;
}
