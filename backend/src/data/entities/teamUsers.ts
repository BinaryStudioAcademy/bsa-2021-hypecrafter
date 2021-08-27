import { Entity, ManyToOne } from 'typeorm';
import { Team, UserProfile } from '.';
import { AbstractEntity } from './abstract';

@Entity()
export class TeamUsers extends AbstractEntity {
  @ManyToOne(
    () => Team,
    team => team.teamUsers
  )
  team: Team;

  @ManyToOne(() => UserProfile, user => user.teamUsers)
  user: UserProfile;
}
