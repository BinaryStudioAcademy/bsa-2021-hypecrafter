import { createRoutine } from 'redux-saga-routines';
import { TransactionsPage } from '../../../common/types';

export enum WalletActions {
  GET_TRANSACTIONS = 'WALLET/GET_TRANSACTIONS',
  CLEAR_TRANSACTIONS_STATE = 'WALLET/CLEAR_TRANSACTIONS_STATE'
}

export const fetchTransactionsPageAction = createRoutine(WalletActions.GET_TRANSACTIONS, {
  trigger: (userId: string, lastPage: number) => ({ userId, lastPage }),
  request: () => undefined,
  success: (transactionPage: TransactionsPage) => transactionPage
});

export const clearTransactionsStateAction = createRoutine(WalletActions.CLEAR_TRANSACTIONS_STATE);

export type FetchTransactionsActionTrigger = ReturnType<typeof fetchTransactionsPageAction.trigger>;
export type FetchTransactionsActionRequest = ReturnType<typeof fetchTransactionsPageAction.request>;
export type FetchTransactionsActionSucces = ReturnType<typeof fetchTransactionsPageAction.success>;
