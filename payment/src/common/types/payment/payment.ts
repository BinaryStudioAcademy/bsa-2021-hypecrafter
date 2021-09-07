export interface Transaction {
  item: string;
  total: number;
  type: string;
  userId: string;
}

export const paginationStep = 5;

export interface Page {
  isLast: boolean;
  page: Transaction[];
}
