import { Schema } from 'mongoose';

export interface Payment {
  _id: string;
  item: string;
  total: number;
  balance: number;
  userId: string;
  type: string;
  createdAt: Schema.Types.Date;
}

export const paginationStep = 5;

export interface Page {
  isLast: boolean;
  page: Payment[];
}

export interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}
