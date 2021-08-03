import { Entity, Column } from 'typeorm';
import { AbstractEntity } from './abstract';

@Entity()
export class Notification extends AbstractEntity {
  // TODO ...
  // Just example
  @Column()
  title: string;

  @Column()
  body: string;
}
