export interface CreateProject{
  id?: string;
  name: string;
  description: string;
  category: string;
  content: string;
  goal: number;
  region: string;

  imageUrl?: string;
  tags?: string[];

  donated?: number;
  totalViews?: number;
  minutesToRead?: number;

  totalInteractionTime?: number;
  startDate?: string;
  finishDate?: string;
}
