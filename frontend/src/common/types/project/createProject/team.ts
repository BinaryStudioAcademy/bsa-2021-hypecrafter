import { CreateProjectChat } from './chat';

export interface CreateProjectTeam{
  id?: string;
  name: string;
  chats: CreateProjectChat[];
}
