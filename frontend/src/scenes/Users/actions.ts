import { createRoutine } from 'redux-saga-routines';
import { User } from '../../common/types/user';

export enum UsersActions {
  FETCH_USERS = 'USERS/GET_ALL',
  REMOVE_USER = 'USERS/REMOVE_BY_ID'
}

export const fetchUsersAction = createRoutine(UsersActions.FETCH_USERS, {
  trigger: () => undefined,
  success: (users: User[]) => users,
  failure: (error: string) => error
});

export const removeUserByIdAction = createRoutine(UsersActions.REMOVE_USER, {
  trigger: (id: number) => id
});

export type FetchUsersTriggerActionType = ReturnType<typeof fetchUsersAction.trigger>;
export type FetchUsersSuccessActionType = ReturnType<typeof fetchUsersAction.success>;
export type FetchUsersFailureActionType = ReturnType<typeof fetchUsersAction.failure>;

export type RemoveUserByIdTriggerActionType = ReturnType<typeof removeUserByIdAction.trigger>;
