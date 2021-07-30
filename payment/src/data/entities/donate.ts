import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { UserProfile } from '../../../../backend/src/data/entities/userProfile';
// import { Project } from '';

@Entity()
export class Donate extends AbstractEntity {
  @Column()
  amount: number;

  @Column()
  public userId!: string;

  @Column()
  public projectId!: string;

  @ManyToOne(() => UserProfile, userProfile => userProfile.donates)
  public userProfile!: UserProfile;
  /*
  @ManyToOne(() => Project, project => project.donate)
  public project!: Project; */
}
