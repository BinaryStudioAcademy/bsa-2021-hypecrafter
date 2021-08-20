import { createRoutine } from 'redux-saga-routines';
import { UserProfile } from '../common/types/userProfile';

export enum UsersActions {
  GET_USERS = 'USERS'
}
export const getUsersAction = createRoutine(UsersActions.GET_USERS, {
  trigger: () => undefined,
  success: (users: UserProfile[]) => users,
  failure: (error: string) => error
});

export type GetUsersTriggerActionType = ReturnType<typeof getUsersAction.trigger>;
export type GetUsersSuccessActionType = ReturnType<typeof getUsersAction.success>;
export type GetUsersFailureActionType = ReturnType<typeof getUsersAction.failure>;
