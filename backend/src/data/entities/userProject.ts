import { Column, Entity, ManyToOne } from 'typeorm';
import { Mark } from '../../common/enums';
import { AbstractEntity } from './abstract';
import { Project } from './project';
import { UserProfile } from './userProfile';

@Entity()
export class UserProject extends AbstractEntity {
  @Column({ type: 'bool', default: false })
  isWatched: boolean;

  @Column({ type: 'bool', default: false })
  isFavorite: boolean;

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
