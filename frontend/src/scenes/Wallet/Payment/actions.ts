import { createRoutine } from 'redux-saga-routines';

export enum WalletActions {
  SET_FUNDS = 'SET_FUNDS',
  FETCH_CLIENT_SECRET = 'FETCH_CLIENT_SECRET'
}

export const setFundAction = createRoutine(WalletActions.SET_FUNDS, {
  trigger: (amount: number, isCustom: boolean) => ({ amount, isCustom }),
});

export const fetchClientSecretAction = createRoutine(WalletActions.FETCH_CLIENT_SECRET, {
  trigger: (amount: number) => ({ amount }),
  success: (clientSecret: string) => ({ clientSecret })
});

export type SetFundActionTrigger = ReturnType<typeof setFundAction.trigger>;
export type FetchClientSecretSuccess = ReturnType<typeof fetchClientSecretAction.success>;
