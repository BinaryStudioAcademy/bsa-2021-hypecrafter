/* eslint-disable import/no-extraneous-dependencies */
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Category } from './category';
import { UserProject } from './userProject';

@Entity()
export class Project extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'bool',
    default: true
  })
  isActive: boolean;

  @Column({ type: 'numeric' })
  goal: number;

  @Column()
  startDate: Date;

  @Column()
  finishDate: Date;

  @Column({ type: 'int' })
  totalViews: number;

  @Column({ type: 'real' })
  minutesToRead: number;

  @Column({ type: 'int' })
  totalInteractionTime: number;

  @Column({ type: 'text' })
  region: string;

  @ManyToOne(() => Category, category => category.projects)
  category: Category;

  @OneToMany(() => UserProject, userProject => userProject.project)
  userProjects: UserProject[];
}
