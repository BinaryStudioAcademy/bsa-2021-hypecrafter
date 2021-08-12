export interface Project {
  id: string,
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
  goal: number;
  donated: number;
  url: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Activity {
  id: string;
  name: string;
}
