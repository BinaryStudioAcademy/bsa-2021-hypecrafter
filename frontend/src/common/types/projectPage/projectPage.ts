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
  FAQ: { id: string, question: string, answer: string }[];
  story: string;
  privileges: { amount: number, privilege: string }[];
  bakersAmount: number;
  finishDate: string;
  instagramUrl?: string;
  facebookUrl?: string;
  dribbleUrl?: string;
}
