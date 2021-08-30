import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Project } from './project';

@Entity()
export class DonatorsPrivilege extends AbstractEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column('text', { array: true })
  includes: string[];

  @Column({ type: 'numeric' })
  amount: number;

  @OneToOne(() => Project, (project: Project) => project)
  @JoinColumn()
  project: Project;
}
