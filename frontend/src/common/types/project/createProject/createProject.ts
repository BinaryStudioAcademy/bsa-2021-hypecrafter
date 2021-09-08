import { CreateProjectFAQ } from './faq';
import { CreateProjectPrivilege } from './privilege';
import { CreateProjectTag } from './projectTag';
import { CreateProjectTeam } from './team';
import { CreateProjectPrivilege } from './privilege';

export interface CreateProject{
  id?: string;
  name: string;
  description: string;
  category: string;
  content: string;
  goal: number;
  region: string;
  team: CreateProjectTeam;

  imageUrl?: string;
  videoUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  dribbleUrl?: string;
  pinterestUrl?: string;
  behanceUrl?: string;
  projectTags: CreateProjectTag[];

  startDate?: Date;
  finishDate?: Date;

  donatorsPrivileges: CreateProjectPrivilege[];
  faqs: CreateProjectFAQ[];
}
