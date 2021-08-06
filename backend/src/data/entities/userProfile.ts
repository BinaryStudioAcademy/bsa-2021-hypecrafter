import { Entity, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Donate } from './donate';
import { UserProject } from './userProject';
import { Chat } from './chat';
import { AlertsSettings } from './alertsSettings';
import { UserAchievement } from './userAchievement';
import { Message } from './message';
import { Comment } from './comment';

@Entity()
export class UserProfile extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'numeric' })
  balance: number;

  // @Column()
  // passwordHash: string;

  // @Column()
  // passwordSalt: string;

  @Column()
  lastLoginDate: Date;

  @Column()
  description: string;

  @Column()
  region: string;

  @OneToMany(() => Donate, donate => donate.user)
  donates: Donate[];

  @OneToMany(() => UserProject, userProject => userProject.user)
  userProjects: UserProject[];

  @OneToMany(() => Chat, chat => chat.donator)
  chats: Chat[];

  @OneToMany(() => UserAchievement, userAchievement => userAchievement.user)
  userAchievements: UserAchievement[];

  @OneToOne(() => AlertsSettings, alertsSettings => alertsSettings.user)
  @JoinColumn()
  alertsSettings: AlertsSettings;

  @OneToMany(() => Message, message => message.author)
  messages: Message[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];
}
