import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Project } from './project';

@Entity()
export class FAQ extends AbstractEntity {
  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @ManyToOne(() => Project, project => project.fAQs)
  public project!: Project;
}
