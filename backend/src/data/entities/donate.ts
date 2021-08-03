import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';
import { UserProfile } from './userProfile';
import { Project } from './project';

@Entity()
export class Donate extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'money' })
  amount: number;

  @ManyToOne(() => UserProfile, userProfile => userProfile.donates)
  public user!: UserProfile;

  @ManyToOne(() => Project, project => project.donates)
  public project!: Project;

  @CreateDateColumn()
  createdAt: Date;
}
