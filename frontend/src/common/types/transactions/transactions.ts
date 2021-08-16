export interface PageRow {
  id?: string;
  date: string;
  items: string;
  type: string;
  total: number;
  balance: number;
}

export interface TransactionsPage{
  page: PageRow[];
  isLast: boolean
}
