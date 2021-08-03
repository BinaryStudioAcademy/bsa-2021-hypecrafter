import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract';
import { Donate } from './donate';
import { UserProject } from './userProject';
import { Chat } from './chat';
import { AlertsSettings } from './alertsSettings';
import { UserAchievement } from './userAchievement';

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

  @Column({ type: 'money' })
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
  public donates!: Donate[];

  @OneToMany(() => UserProject, userProject => userProject.user)
  public userProjects!: UserProject[];

  @OneToMany(() => Chat, chat => chat.donator)
  public chats!: Chat[];

  @OneToMany(() => UserAchievement, userAchievement => userAchievement.user)
  public userAchievements!: UserAchievement[];

  @OneToOne(() => AlertsSettings)
  @JoinColumn()
  alertsSettings: AlertsSettings;
}
