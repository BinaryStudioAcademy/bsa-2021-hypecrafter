export interface IProject {
  name?: string;
  description?: string;
  isActive?: boolean;
  goal?: number;
  startDate?: string;
  finishDate?: string;
  totalViews?: number;
  minutesToRead?: number;
  totalInteractionTime?: number;
  region?: string;
  categoryId?: string;
}
