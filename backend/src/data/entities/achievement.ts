import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract';
import { UserAchievement } from './userAchievement';

@Entity()
export class Achievement extends AbstractEntity {
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'numeric' })
  goal: number;

  @OneToMany(
    () => UserAchievement,
    userAchievement => userAchievement.achievement
  )
  userAchievements: UserAchievement[];
}
