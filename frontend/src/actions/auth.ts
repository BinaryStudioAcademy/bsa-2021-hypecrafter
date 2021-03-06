import { createRoutine } from 'redux-saga-routines';
import { User } from '../common/types/user';

export enum AuthActions {
  FETCH_USER = 'AUTH/FETCH_USER',
  REMOVE_USER = 'AUTH/REMOVE_USER'
}

export const authFetchUserAction = createRoutine(AuthActions.FETCH_USER, {
  trigger: () => undefined,
  success: (user: User) => user,
  failure: () => undefined
});

export const authRemoveUserAction = createRoutine(AuthActions.REMOVE_USER, {
  trigger: () => undefined
});

export type AuthFetchUserTriggerActionType = ReturnType<typeof authFetchUserAction.trigger>;
export type AuthFetchUserSuccessActionType = ReturnType<typeof authFetchUserAction.success>;
export type AuthFetchUserFailureActionType = ReturnType<typeof authFetchUserAction.failure>;

export type AuthRemoveUserTriggerActionType = ReturnType<typeof authRemoveUserAction.trigger>;
