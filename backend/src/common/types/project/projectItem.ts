export interface ProjectItem {
  id: string;
  name: string;
  authorId: string;
  description: string;
  category: string;
  imageUrl?: string;
  tags: string[];
  goal: number;
  donated: number;
  url?: string;
  views: number;
}
