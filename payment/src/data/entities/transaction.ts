import { Entity, Column } from 'typeorm';
import { AbstractEntity } from './abstract';

@Entity()
export class Transaction extends AbstractEntity {
  @Column()
  amount: number;

  @Column()
  public userId!: string;

  @Column()
  public projectId!: string;

  /*
  @Column()
  public toProject!: bool;
  */
}
