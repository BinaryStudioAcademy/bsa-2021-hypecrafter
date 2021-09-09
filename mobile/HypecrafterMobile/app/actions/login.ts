import { createRoutine } from 'redux-saga-routines';
import { LoginData, Tokens } from '../common/types';

export enum AuthenticationActions {
  LOGIN = 'AUTHENTICATION/LOGIN',
  LOGOUT = 'AUTHENTICATION/LOGOUT'
}

export const loginAction = createRoutine(AuthenticationActions.LOGIN, {
  trigger: (data: LoginData) => data,
  success: (tokens: Tokens) => tokens,
  failure: (error: string) => error
});


export const logoutAction = createRoutine(AuthenticationActions.LOGOUT, {
  trigger: () => undefined,
});

export type LoginActionType = ReturnType<typeof loginAction.trigger>;
export type LoginSuccessActionType = ReturnType<typeof loginAction.success>;
export type LoginFailureActionType = ReturnType<typeof loginAction.failure>;

export type LogoutActionType = ReturnType<typeof logoutAction.trigger>;
