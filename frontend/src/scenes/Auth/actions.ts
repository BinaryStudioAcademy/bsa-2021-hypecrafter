import { createRoutine } from 'redux-saga-routines';
import { LoginData } from '../../common/types/login';
import { SignupData, Tokens } from '../../common/types/signup';

export enum AuthenticationActions {
  REGISTER_USER = 'AUTHENTICATION/REGISTER_USER',
  LOGIN = 'AUTHENTICATION/LOGIN',
  GOOGLE = 'AUTHENTICATION/GOOGLE'
}

export const registerUserAction = createRoutine(AuthenticationActions.REGISTER_USER, {
  trigger: (data: SignupData) => data,
  success: (tokens: Tokens) => tokens,
  failure: (error: string) => error
});

export const googleAuthAction = createRoutine(AuthenticationActions.GOOGLE, {
  trigger: () => undefined,
  success: (tokens: Tokens) => tokens,
  failure: (error: string) => error
});

export const loginAction = createRoutine(AuthenticationActions.LOGIN, {
  trigger: (data: LoginData) => data,
  success: (tokens: Tokens) => tokens,
  failure: (error: string) => error
});

export type RegisterUserActionType = ReturnType<typeof registerUserAction.trigger>;
export type RegisterUserSuccessActionType = ReturnType<typeof registerUserAction.success>;
export type RegisterUserFailureActionType = ReturnType<typeof registerUserAction.failure>;

export type LoginActionType = ReturnType<typeof loginAction.trigger>;
export type LoginSuccessActionType = ReturnType<typeof loginAction.success>;
export type LoginFailureActionType = ReturnType<typeof loginAction.failure>;

export type GoogleAuthActionType = ReturnType<typeof loginAction.trigger>;
export type GoogleAuthSuccessActionType = ReturnType<typeof loginAction.success>;
export type GoogleAuthFailureActionType = ReturnType<typeof loginAction.failure>;
