import { createRoutine } from 'redux-saga-routines';
import { UserProfile } from '../../common/types';

export enum UsersProfileActions {
  FETCH_USER = 'USERS/GET_BY_ID'
}

export const fetchUserProfileAction = createRoutine(UsersProfileActions.FETCH_USER, {
  trigger: (id: string) => id,
  success: (userProfile: UserProfile) => userProfile,
  failure: (error: string) => error
});

export type FetchUserProfileTriggerActionType = ReturnType<typeof fetchUserProfileAction.trigger>;
export type FetchUserProfileSuccessActionType = ReturnType<typeof fetchUserProfileAction.success>;
export type FetchUserProfileFailureActionType = ReturnType<typeof fetchUserProfileAction.failure>;
