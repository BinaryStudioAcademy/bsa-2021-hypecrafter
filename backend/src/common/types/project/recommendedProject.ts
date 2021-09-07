export interface RecommendedProjects {
  id: string;
  name: string;
  totalInteractionTime: number;
  totalViews: number;
  donated: number;
  categoryName: string;
  region: string;
  goal: number;
  createdAt: Date;
  tags: string[];
  likes: number;
  dislikes: number;
  imageUrl?: string;
  isActive: boolean;
  isSuccess: boolean | null;
}
