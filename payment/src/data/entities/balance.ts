import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract';

@Entity()
export class Balance extends AbstractEntity {
  @Column({ type: 'numeric' })
  balance: number;

  @Column()
  userId: string;
}
