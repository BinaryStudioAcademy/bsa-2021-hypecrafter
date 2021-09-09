import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract';

@Entity()
export class Job extends AbstractEntity {
  @Column()
  finishDate: Date;

  @Column()
  projectId: string;
}
