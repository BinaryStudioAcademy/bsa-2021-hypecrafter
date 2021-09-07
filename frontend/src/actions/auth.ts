import { createRoutine } from 'redux-saga-routines';
import { User } from '../common/types/user';

export enum AuthActions {
  FETCH_USER = 'AUTH/FETCH_USER',
  REMOVE_USER = 'AUTH/REMOVE_USER'
}

export enum UsersProfileActions {
  OPEN_MODAL = 'USER_PROFILE/OPEN_MODAL',
  CLOSE_MODAL = 'USER_PROFILE/CLOSE_MODAL',
  SET_EDIT_STATE = 'USER_PROFILE/SET_EDIT_STATE',
  UPDATE_USER = 'USER_PROFILE/UPDATE'
}

export const authFetchUserAction = createRoutine(AuthActions.FETCH_USER, {
  trigger: () => undefined,
  success: (user: User) => user,
  failure: () => undefined
});

export const authRemoveUserAction = createRoutine(AuthActions.REMOVE_USER, {
  trigger: () => undefined
});

export const openModalAction = createRoutine(UsersProfileActions.OPEN_MODAL, {
  trigger: (id: string) => id
});

export const closeModalAction = createRoutine(UsersProfileActions.CLOSE_MODAL, {
  trigger: () => undefined
});

export const setEditingAction = createRoutine(UsersProfileActions.SET_EDIT_STATE, {
  trigger: (isEditing: boolean) => isEditing
});

export const updateUserProfileAction = createRoutine(UsersProfileActions.UPDATE_USER, {
  trigger: (userProfile: User) => userProfile,
  success: (userProfile: User) => userProfile,
  failure: (error: string) => error
});

export type AuthFetchUserTriggerActionType = ReturnType<typeof authFetchUserAction.trigger>;
export type AuthFetchUserSuccessActionType = ReturnType<typeof authFetchUserAction.success>;
export type AuthFetchUserFailureActionType = ReturnType<typeof authFetchUserAction.failure>;
export type OpenModalTriggerActionType = ReturnType<typeof openModalAction.trigger>;
export type SetEditingTriggerActionType = ReturnType<typeof setEditingAction.trigger>;
export type UpdateUserProfileTriggerActionType = ReturnType<typeof updateUserProfileAction.trigger>;
export type UpdateUserProfileSuccessActionType = ReturnType<typeof updateUserProfileAction.success>;
export type UpdateUserProfileFailureActionType = ReturnType<typeof updateUserProfileAction.failure>;
export type AuthRemoveUserTriggerActionType = ReturnType<typeof authRemoveUserAction.trigger>;
