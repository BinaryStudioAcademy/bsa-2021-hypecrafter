import { createRoutine } from 'redux-saga-routines';
import { User } from '../common/types/user';

export enum authActions {
  AUTH = 'AUTH/FETCH_USER'
}

export const authAction = createRoutine(authActions.AUTH, {
  trigger: () => undefined,
  success: (user: User) => user,
  failure: () => null
});

export type AuthTriggerActionType = ReturnType<typeof authAction.trigger>;
export type AuthSuccessActionType = ReturnType<typeof authAction.success>
export type AuthFailureActionType = ReturnType<typeof authAction.failure>
