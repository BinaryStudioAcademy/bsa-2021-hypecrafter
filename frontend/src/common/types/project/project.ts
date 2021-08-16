export interface Project {
  id?: string | undefined;
  name: string;
  description: string;
  category?: string;
  imageUrl?: string;
  tags: string[];
  goal: number;
  donated: number;
  url?: string;
  totalViews: number;
  minutesToRead: number;
  region: string;
  totalInteractionTime: number;
  startDate: string;
  finishDate: string;
}
