import { EntityRepository, Repository } from 'typeorm';
import { TeamUsers } from '../entities';

@EntityRepository(TeamUsers)
export class TeamUserRepository extends Repository<TeamUsers> {}
