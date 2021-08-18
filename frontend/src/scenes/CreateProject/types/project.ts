import { Team } from './team';

export interface CreateProject{
  id?: string;
  name: string;
  description: string;
  category: string;
  content: string;
  goal: number;
  region: string;
  team: Team;

  imageUrl?: string;
  tags?: string[];

  donated?: number;
  url?: string;
  totalViews?: number;
  minutesToRead?: number;

  totalInteractionTime?: number;
  startDate?: Date;
  finishDate?: Date;
}
