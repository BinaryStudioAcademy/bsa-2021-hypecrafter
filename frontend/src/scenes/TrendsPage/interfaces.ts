export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
  goal: number;
  donated: number;
  url: string;
}

export interface TagItem {
  name: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}
