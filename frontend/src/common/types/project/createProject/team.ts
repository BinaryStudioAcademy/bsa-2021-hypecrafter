import { CreateProjectTeamUsers } from './teamUsers';

export interface CreateProjectTeam{
  id?: string;
  name: string;
  teamUsers: CreateProjectTeamUsers[];
}
