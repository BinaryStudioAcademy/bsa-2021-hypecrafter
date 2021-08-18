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
  bakersAmount: number;
  FAQ: { question: string, answer: string }[];
  story: string;
  privileges: { amount: number, privilege: string }[];
  instagramUrl?: string;
  facebookUrl?: string;
  dribbleUrl?: string;
  finishDate: string;
}
