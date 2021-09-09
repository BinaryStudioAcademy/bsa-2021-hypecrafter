import { createRoutine } from 'redux-saga-routines';

export enum WalletActions {
  SHOW_DONATE_MODAL = 'DONATE/SHOW_DONATE_MODAL',
  HIDE_DONATE_MODAL = 'DONATE/HIDE_DONATE_MODAL',
  EXECUTE_DONATE = 'DONATE/EXECUTE_DONATE'
}

export const showDonateModalAction = createRoutine(WalletActions.SHOW_DONATE_MODAL, {
  trigger: (projectId: string) => ({ projectId })
});

export const hideDonateModalAction = createRoutine(WalletActions.HIDE_DONATE_MODAL);

export const executeDonateAction = createRoutine(WalletActions.EXECUTE_DONATE, {
  trigger: (projectId: string, amount: number) => ({ projectId, amount }),
  success: (success: boolean) => ({ success })
});

export type HideDonateModalActionTrigger = ReturnType<typeof hideDonateModalAction.trigger>;
export type ShowDonateModalActionTrigger = ReturnType<typeof showDonateModalAction.trigger>;
export type ExecuteDonateActionTrigger = ReturnType<typeof executeDonateAction.trigger>;
export type ExecuteDonateActionSuccess = ReturnType<typeof executeDonateAction.success>;
