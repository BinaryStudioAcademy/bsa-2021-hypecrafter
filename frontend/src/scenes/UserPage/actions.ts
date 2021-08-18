import { createRoutine } from 'redux-saga-routines';
import { UserProfile } from '../../common/types';

export enum UsersProfileActions {
  FETCH_USER = 'USERS/GET_BY_ID',
  OPEN_MODAL = 'USER_PROFILE/OPEN_MODAL',
  CLOSE_MODAL = 'USER_PROFILE/CLOSE_MODAL'
}

export const fetchUserProfileAction = createRoutine(UsersProfileActions.FETCH_USER, {
  trigger: (id: string) => id,
  success: (userProfile: UserProfile) => userProfile,
  failure: (error: string) => error
});

export const openModalAction = createRoutine(UsersProfileActions.OPEN_MODAL, {
  trigger: (id: string) => id
});

export const closeModalAction = createRoutine(UsersProfileActions.CLOSE_MODAL, {
  trigger: () => undefined
});

export type FetchUserProfileTriggerActionType = ReturnType<typeof fetchUserProfileAction.trigger>;
export type FetchUserProfileSuccessActionType = ReturnType<typeof fetchUserProfileAction.success>;
export type FetchUserProfileFailureActionType = ReturnType<typeof fetchUserProfileAction.failure>;
export type OpenModalTriggerActionType = ReturnType<typeof openModalAction.trigger>;
export type CloseModalTriggerActionType = ReturnType<typeof closeModalAction.trigger>;
