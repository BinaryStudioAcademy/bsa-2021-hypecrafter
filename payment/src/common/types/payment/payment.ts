export interface Payment {
  _id: string;
  item: string;
  total: number;
  userId: string;
  type: string;
  createdAt: Date;
}

export type NewPayment = Omit<Payment, '_id' | 'createdAt'>;

export const paginationStep = 9;

export interface Page {
  isLast: boolean;
  page: Payment[];
}
