import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserProfile } from './userProfile';
import { Achievement } from './achievement';

@Entity()
export class UserAchievement extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'real' })
  progress: number;

  @ManyToOne(() => UserProfile, userProfile => userProfile.userAchievements)
  public user!: UserProfile;

  @ManyToOne(() => Achievement, achievement => achievement.userAchievements)
  public achievement!: Achievement;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
