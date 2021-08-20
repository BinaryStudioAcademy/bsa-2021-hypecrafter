import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { AlertsSettings } from './alertsSettings';
import { Chat } from './chat';
import { Comment } from './comment';
import { Donate } from './donate';
import { Message } from './message';
import { Project } from './project';
import { Tag } from './tag';
import { TeamUsers } from './teamUsers';
import { UserAchievement } from './userAchievement';
import { UserProject } from './userProject';

@Entity()
export class UserProfile extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'numeric', default: 0 })
  balance: number;

  @Column({ type: 'numeric', default: 0 })
  rating: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLoginDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  instagramUrl: string;

  @Column({ nullable: true })
  facebookUrl: string;

  @Column({ nullable: true })
  dribbleUrl: string;

  @OneToOne(() => AlertsSettings, alertsSettings => alertsSettings.user)
  @JoinColumn()
  alertsSettings: AlertsSettings;

  @OneToMany(() => Donate, donate => donate.user)
  donates: Donate[];

  @OneToMany(() => UserProject, userProject => userProject.user)
  userProjects: UserProject[];

  @OneToMany(() => Chat, chat => chat.donator)
  chats: Chat[];

  @OneToMany(() => UserAchievement, userAchievement => userAchievement.user)
  userAchievements: UserAchievement[];

  @OneToMany(() => Message, message => message.author)
  messages: Message[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(() => Tag, tag => tag.author)
  tags: Tag[];

  @OneToMany(() => Project, project => project.author)
  projects: Project[];

  @OneToMany(() => TeamUsers, teamUsers => teamUsers.team)
  teamUsers: TeamUsers[];
}
