import { createRoutine } from 'redux-saga-routines';
import { LoginData } from '../../common/types/login';
import { SignupData, Tokens } from '../../common/types/signup';

export enum AuthenticationActions {
  REGISTER_USER = 'AUTHENTICATION/REGISTER_USER',
  LOGIN = 'AUTHENTICATION/LOGIN',
  FACEBOOK = 'AUTHENTICATION/FACEBOOK'
}

export const registerUserAction = createRoutine(AuthenticationActions.REGISTER_USER, {
  trigger: (data: SignupData) => data,
  success: (tokens: Tokens) => tokens,
  failure: (error: string) => error
});

export const loginAction = createRoutine(AuthenticationActions.LOGIN, {
  trigger: (data: LoginData) => data,
  success: (tokens: Tokens) => tokens,
  failure: (error: string) => error
});

export const facebookAuthAction = createRoutine(AuthenticationActions.FACEBOOK, {
  trigger: (token: string) => token,
  success: (tokens: Tokens) => tokens,
  failure: (error: string) => error
});

export type RegisterUserActionType = ReturnType<typeof registerUserAction.trigger>;
export type RegisterUserSuccessActionType = ReturnType<typeof registerUserAction.success>;
export type RegisterUserFailureActionType = ReturnType<typeof registerUserAction.failure>;

export type LoginActionType = ReturnType<typeof loginAction.trigger>;
export type LoginSuccessActionType = ReturnType<typeof loginAction.success>;
export type LoginFailureActionType = ReturnType<typeof loginAction.failure>;

export type FacebookAuthActionType = ReturnType<typeof facebookAuthAction.trigger>;
export type FacebookAuthSuccessActionType = ReturnType<typeof facebookAuthAction.success>;
export type FacebookAuthFailureActionType = ReturnType<typeof facebookAuthAction.failure>;
