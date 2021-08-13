export interface ProjectPage {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
  tags: string[];
  goal: number;
  donated: number;
  url?: string;
  likes?: number;
  dislikes?: number;
  instagramUrl?: string;
  facebookUrl?: string;
  dribbleUrl?: string;
}
