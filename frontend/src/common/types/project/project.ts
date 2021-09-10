import { ProjectPrivilege } from '.';
import { Comment } from '../comment';
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
  involvementIndex: number;
}

export interface ProjectPage extends Project {
  likes: number;
  dislikes: number;
  bakersAmount: number;
  FAQ: { id: string; question: string; answer: string }[];
  story: string;
  privileges: ProjectPrivilege[];
  instagramUrl?: string;
  facebookUrl?: string;
  dribbleUrl?: string;
  finishDate: string;
  projectComments: Comment[];
  mark?: Mark | null;
  isWatched: boolean;
  authorId: string;
}
