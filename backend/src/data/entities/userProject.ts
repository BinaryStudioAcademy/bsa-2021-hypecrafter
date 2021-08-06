import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract';
import { UserProfile } from './userProfile';
import { Project } from './project';
import { Mark } from '../../common/enums';

@Entity()
export class UserProject extends AbstractEntity {
  @Column({ type: 'bool' })
  IsWatched: boolean;

  @Column({
    type: 'enum',
    enum: Mark
  })
  mark: Mark;

  @ManyToOne(() => UserProfile, userProfile => userProfile.userProjects)
  user: UserProfile;

  @ManyToOne(() => Project, project => project.userProjects)
  project: Project;
}
