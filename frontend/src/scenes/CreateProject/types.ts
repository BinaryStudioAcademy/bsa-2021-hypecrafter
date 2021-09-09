export interface RecommendedProject {
  id: string;
  name: string;
  categoryName?: string;
  imageUrl: string;
  tags: string[];
  goal: number;
  donated: number;
  totalViews: number;
  region: string;
  totalInteractionTime: number;
  isActive: boolean;
  isSuccess: boolean;
  createdAt: string;
}
