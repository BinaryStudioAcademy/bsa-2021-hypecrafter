import { EntityRepository, Repository } from 'typeorm';
import { Team } from '../entities/team';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  public getAll() {
    return this.find();
  }
}
