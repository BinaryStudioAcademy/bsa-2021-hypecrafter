import { createRoutine } from 'redux-saga-routines';

export enum WalletActions {
  SET_FUNDS = 'WALLET/SET_FUNDS'
}

export const setFundAction = createRoutine(WalletActions.SET_FUNDS, {
  trigger: (amount: number, isCustom: boolean) => ({ amount, isCustom }),
});

export type SetFundActionTrigger = ReturnType<typeof setFundAction.trigger>;
