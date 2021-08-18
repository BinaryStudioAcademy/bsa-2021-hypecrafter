import { Chat } from './chat';

export interface Team{
  id?: string;
  name: string;
  chats: Chat[];
}
