import { Entity, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Donate } from './donate';
import { UserProject } from './userProject';
import { Chat } from './chat';
import { AlertsSettings } from './alertsSettings';
import { UserAchievement } from './userAchievement';
import { Message } from './message';
import { Comment } from './comment';
import { Tag } from './tag';
import { Project } from './project';

@Entity()
export class UserProfile extends AbstractEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'numeric' })
  balance: number;

  @Column()
  lastLoginDate: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  birthday: string;

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
}
