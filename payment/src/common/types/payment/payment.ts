import { Schema } from 'mongoose';

export interface Payment {
  _id: string;
  item: string;
  total: Schema.Types.Decimal128;
  balance: Schema.Types.Decimal128;
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
