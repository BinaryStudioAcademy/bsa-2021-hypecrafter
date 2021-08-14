export interface ProjectPage {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
  tags: string[];
  goal: number;
  donated: number;
  likes: number;
  dislikes: number;
  FAQ: { question: string, answer: string }[];
  instagramUrl?: string;
  facebookUrl?: string;
  dribbleUrl?: string;
}
