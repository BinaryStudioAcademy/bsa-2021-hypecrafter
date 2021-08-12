export interface Payment {
  id: string;
  item: string;
  total: number;
  userId: string;
  balance: number;
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
