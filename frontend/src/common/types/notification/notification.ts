import { ReactNode } from 'react';

export interface Notification {
  image: string;
  text: ReactNode;
  date: string;
  id?: string;
}
