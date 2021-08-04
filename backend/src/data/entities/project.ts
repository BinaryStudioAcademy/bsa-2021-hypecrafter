import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { AbstractEntity } from './abstract';
import { Category } from './category';
import { Donate } from './donate';
import { UserProject } from './userProject';
import { ProjectTag } from './projectTag';
import { Team } from './team';
import { FAQ } from './faq';

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

  @Column({ type: 'money' })
  goal: number;

  @Column()
  startDate: Date;

  @Column()
  finishDate: Date;

  @Column({ type: 'int' })
  totalViews: number;

  @Column({ type: 'int' })
  minutesToRead: number;

  @Column({ type: 'int' })
  totalInteractionTime: number;

  @Column({ type: 'text' })
  region: string;

  @ManyToOne(() => Category, category => category.projects)
  category!: Category;

  @OneToMany(() => Donate, donate => donate.project)
  donates!: Donate[];

  @OneToMany(() => UserProject, userProject => userProject.project)
  userProjects!: UserProject[];

  @OneToMany(() => ProjectTag, projectTag => projectTag.project)
  projectTags!: ProjectTag[];

  @OneToOne(() => Team, team => team.project)
  @JoinColumn()
  team: Team;

  @OneToMany(() => FAQ, faq => faq.project)
  faqs!: FAQ[];
}
