import { Entity, Column } from 'typeorm';
import { AbstractEntity } from './abstract';

@Entity()
export class Replenishment extends AbstractEntity {
  @Column()
  amount: number;

  @Column()
  public userId!: string;

  @Column()
  public type!: string;

}
