import { createRoutine } from 'redux-saga-routines';
import { TransactionsPage } from '../../../common/types';

export enum WalletActions {
  GET_TRANSACTIONS = 'WALLET/GET_TRANSACTIONS'
}

export const fetchTransactionsPageAction = createRoutine(WalletActions.GET_TRANSACTIONS, {
  trigger: (userId: string, pageNum: number) => ({ userId, pageNum }),
  request: () => undefined,
  success: (transactionPage: TransactionsPage) => transactionPage
});

export type FetchTransactionsActionTrigger = ReturnType<typeof fetchTransactionsPageAction.trigger>;
export type FetchTransactionsActionRequest = ReturnType<typeof fetchTransactionsPageAction.request>;
export type FetchTransactionsActionSucces = ReturnType<typeof fetchTransactionsPageAction.success>;
