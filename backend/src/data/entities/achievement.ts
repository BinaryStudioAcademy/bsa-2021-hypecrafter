import {
  BaseEntity,
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';
import { UserAchievement } from './userAchievement';

@Entity()
export class Achievement extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'money' })
  goal: number;

  @OneToMany(
    () => UserAchievement,
    userAchievement => userAchievement.achievement
  )
  public userAchievements!: UserAchievement[];

  @CreateDateColumn()
  createdAt: Date;
}
