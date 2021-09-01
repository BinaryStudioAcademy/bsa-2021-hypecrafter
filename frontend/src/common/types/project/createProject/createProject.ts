import { CreateProjectTag } from './projectTag';
import { CreateProjectTeam } from './team';
import { CreateProjectPrivilege } from './privilege';

export interface CreateProject{
  name: string;
  description: string;
  category: string;
  content: string;
  goal: number;
  region: string;
  team: CreateProjectTeam;

  imageUrl?: string;
  videoUrl?: string;
  projectTags: CreateProjectTag[];

  startDate?: Date;
  finishDate?: Date;

  donatorsPrivileges: CreateProjectPrivilege[];
}
