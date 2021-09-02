import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract';

@Entity()
export class Notification extends AbstractEntity {
  @Column()
  type: string;

  @Column({ type: 'money', nullable: true })
  amount: number;

  @Column({ nullable: true })
  userId: string;

  @Column()
  projectId: string;
}
