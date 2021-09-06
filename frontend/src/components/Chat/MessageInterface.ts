export interface Message {
  id: number;
  text: string;
  name: string;
  date: Date;
  role?: 'backer' | 'owner' | undefined;
}
