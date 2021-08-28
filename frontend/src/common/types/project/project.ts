import { Mark } from './mark';

export interface Project {
  id: string;
  name: string;
  description: string;
  category?: string;
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  goal: number;
  donated: number;
  url?: string;
  totalViews: number;
  minutesToRead: number;
  region: string;
  totalInteractionTime: number;
}

export interface ProjectPage extends Project {
  likes: number;
  dislikes: number;
  bakersAmount: number;
  FAQ: { id: string, question: string, answer: string }[];
  story: string;
  privileges: { amount: number, privilege: string }[];
  instagramUrl?: string;
  facebookUrl?: string;
  dribbleUrl?: string;
  finishDate: string;
  mark?: Mark | null;
  isWatched: boolean;
}
