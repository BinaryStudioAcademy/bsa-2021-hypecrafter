export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
  tags: string[];
  goal: number;
  donated: number;
  url?: string;
}

export interface ProjectPage extends Project {
  likes: number;
  dislikes: number;
  FAQ: { question: string, answer: string }[];
  instagramUrl?: string;
  facebookUrl?: string;
  dribbleUrl?: string;
}
