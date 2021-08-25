import { CreateProjectTeam } from './team';
import { CreateProjectTag } from './projectTag';

export interface CreateProject{
  name: string;
  description: string;
  category: string;
  content: string;
  goal: number;
  region: string;
  team: CreateProjectTeam;

  imageUrl?: string;
  projectTags: CreateProjectTag[];

  startDate?: Date;
  finishDate?: Date;
}
