import { createRoutine } from 'redux-saga-routines';
import { SignupData } from '../../common/types/signup';

export enum RegistrationActions {
  REGISTER_USER = 'REGISTRATION/REGISTER_USER'
}

export const registerUserAction = createRoutine(RegistrationActions.REGISTER_USER, {
  trigger: (data: SignupData) => data,
  success: (tokens: { refreshToken: string, accessToken: string }) => tokens,
  failure: (error: string) => error
});

export type RegisterUserActionType = ReturnType<typeof registerUserAction.trigger>
export type RegisterUserSuccessActionType = ReturnType<typeof registerUserAction.success>
export type RegisterUserFailureActionType = ReturnType<typeof registerUserAction.failure>
