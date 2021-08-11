import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { UserProfile } from './userProfile';
import { Project } from './project';

@Entity()
export class Donate extends AbstractEntity {
  @Column({ type: 'numeric' })
  amount: number;

  @ManyToOne(() => UserProfile, userProfile => userProfile.donates)
  user: UserProfile;

  @ManyToOne(() => Project, project => project.donates)
  project: Project;
}
