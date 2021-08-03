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
import { FAQ } from './fAQ';

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
  public category!: Category;

  @OneToMany(() => Donate, donate => donate.project)
  public donates!: Donate[];

  @OneToMany(() => UserProject, userProject => userProject.project)
  public userProjects!: UserProject[];

  @OneToMany(() => ProjectTag, projectTag => projectTag.project)
  public projectTags!: ProjectTag[];

  @OneToOne(() => Team)
  @JoinColumn()
  team: Team;

  @OneToMany(() => FAQ, fAQ => fAQ.project)
  public fAQs!: FAQ[];
}
