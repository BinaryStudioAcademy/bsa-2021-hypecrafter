import { createRoutine } from 'redux-saga-routines';
import { PageRow } from './utils';

export enum WalletActions {
  GET_TRANSACTIONS = 'WALLET/GET_TRANSACTIONS'
}

export const getTransactionsPage = createRoutine(WalletActions.GET_TRANSACTIONS, {
  trigger: (userId: string, pageNum: number) => ({ userId, pageNum }),
  request: () => undefined,
  success: (isLast: boolean, page: PageRow[]) => ({ isLast, page })
});

export type GetTransactionsActionTrigger = ReturnType<typeof getTransactionsPage.trigger>;
export type GetTransactionsActionRequest = ReturnType<typeof getTransactionsPage.request>;
export type GetTransactionsActionSucces = ReturnType<typeof getTransactionsPage.success>;
