import { BaseEntity, Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { UserProfile } from './userProfile';
// import { Project } from './project';

@Entity()
export class Donate extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @ManyToOne(() => UserProfile, userProfile => userProfile.donates)
  public userProfile!: UserProfile;
  /*
  @ManyToOne(() => Project, project => project.donate)
  public project!: Project; */

  @CreateDateColumn()
  createdAt: Date;
}
