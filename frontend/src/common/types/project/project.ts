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
  startDate: Date;
  finishDate: Date;
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
  finishDate: Date;

}
