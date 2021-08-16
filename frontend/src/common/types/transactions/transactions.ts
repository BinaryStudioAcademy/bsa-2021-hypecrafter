export interface PageRow {
  id: string;
  createdAt: string;
  item: string;
  type: string;
  total: number;
  balance: number;
}

export interface TransactionsPage{
  page: PageRow[];
  isLast: boolean;
}
