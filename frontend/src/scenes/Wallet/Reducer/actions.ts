import { createRoutine } from 'redux-saga-routines';

export enum WalletActions {
  GET_TRANSACTIONS = 'WALLET/GET_TRANSACTIONS'
}


export const getTransactions = createRoutine(WalletActions.GET_TRANSACTIONS, {
    trigger: () => undefined
});

export type GetTransactionsType = ReturnType<typeof getTransactions.trigger>;
