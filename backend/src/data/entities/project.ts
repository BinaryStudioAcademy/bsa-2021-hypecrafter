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
import { Comment } from './comment';
import { Donate } from './donate';
import { UserProject } from './userProject';
import { ProjectTag } from './projectTag';
import { Team } from './team';
import { FAQ } from './faq';
import { UserProfile } from './userProfile';

@Entity()
export class Project extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  content: string;

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

  @Column({ type: 'real' })
  totalInteractionTime: number;

  @Column({ type: 'text' })
  region: string;

  @OneToOne(() => Team, team => team.project)
  @JoinColumn()
  team: Team;

  @OneToMany(() => Donate, donate => donate.project)
  donates: Donate[];

  @OneToMany(() => UserProject, userProject => userProject.project)
  userProjects: UserProject[];

  @OneToMany(() => ProjectTag, projectTag => projectTag.project)
  projectTags: ProjectTag[];

  @OneToMany(() => FAQ, faq => faq.project)
  faqs: FAQ[];

  @OneToMany(() => Comment, comment => comment.project)
  comments: Comment[];

  @ManyToOne(() => Category, category => category.projects)
  category: Category;

  @ManyToOne(() => UserProfile, userProfile => userProfile.projects)
  author: UserProfile;
}
