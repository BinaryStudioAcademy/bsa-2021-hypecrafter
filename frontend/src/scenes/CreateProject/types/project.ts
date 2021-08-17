export interface CreateProject{
  id?: string;
  name: string;
  description: string;
  category: string;
  content: string;
  goal: number;

  imageUrl?: string;
  tags?: string[];

  donated?: number;
  url?: string;
  totalViews?: number;
  minutesToRead?: number;
  region?: string;
  totalInteractionTime?: number;
  startDate?: string;
  finishDate?: string;
}
