import { Mark } from '../enums';

export interface IUserProject {
  IsWatched?: boolean;
  mark?: Mark;
  userId?: string;
  projectId?: string;
}
