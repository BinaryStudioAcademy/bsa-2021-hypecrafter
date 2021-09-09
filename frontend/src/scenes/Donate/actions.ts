import { createRoutine } from 'redux-saga-routines';

export enum DonateActions {
  SHOW_DONATE_MODAL = 'DONATE/SHOW_DONATE_MODAL',
  HIDE_DONATE_MODAL = 'DONATE/HIDE_DONATE_MODAL',
  EXECUTE_DONATE = 'DONATE/EXECUTE_DONATE'
}

export const showDonateModalAction = createRoutine(DonateActions.SHOW_DONATE_MODAL, {
  trigger: (projectId: string) => ({ projectId })
});

export const hideDonateModalAction = createRoutine(DonateActions.HIDE_DONATE_MODAL);

export const executeDonateAction = createRoutine(DonateActions.EXECUTE_DONATE, {
  trigger: (projectId: string, amount: number) => ({ projectId, amount })
});

export type ShowDonateModalActionTrigger = ReturnType<typeof showDonateModalAction.trigger>;
export type ExecuteDonateActionTrigger = ReturnType<typeof executeDonateAction.trigger>;
