import { getUsersAction } from '../actions';
import type {
  GetUsersFailureActionType,
  GetUsersSuccessActionType
} from '../actions/users';
import { UserProfile } from '../common/types';
import { createReducer } from '../helpers';

export interface UsersState{
  isLoading: boolean;
  users: UserProfile[];
  error: string;
}

export const initialState: UsersState = {
  isLoading: false,
  users: [],
  error: '',
};

export const usersReduser = createReducer<UsersState>(initialState, {
  [getUsersAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [getUsersAction.SUCCESS](state, action: GetUsersSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      users: action.payload
    };
  },
  [getUsersAction.FAILURE](state, action: GetUsersFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }
});
export default usersReduser;
