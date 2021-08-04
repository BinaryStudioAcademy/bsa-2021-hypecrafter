import {
  Entity,
  Column,
  ManyToOne
} from 'typeorm';
import { AbstractEntity } from './abstract';
import { UserProfile } from './userProfile';
import { Achievement } from './achievement';

@Entity()
export class UserAchievement extends AbstractEntity {
  @Column({ type: 'real' })
  progress: number;

  @ManyToOne(() => UserProfile, userProfile => userProfile.userAchievements)
  user!: UserProfile;

  @ManyToOne(() => Achievement, achievement => achievement.userAchievements)
  achievement!: Achievement;
}
