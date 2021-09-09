import type {
  AuthFetchUserSuccessActionType
} from '../actions/auth';
import { authFetchUserAction, authRemoveUserAction } from '../actions/auth';
import { User } from '../common/types';
import { createReducer } from '../helpers';

export interface AuthState {
  isLoading: boolean;
  user: User | null;
}

export const authState: AuthState = {
  isLoading: false,
  user: null
};

export const authReducer = createReducer<AuthState>(authState, {
  [authFetchUserAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [authFetchUserAction.SUCCESS](state, action: AuthFetchUserSuccessActionType) {
    console.log(action.payload)
    return {
      ...state,
      isLoading: false,
      user: action.payload
    };
  },
  [authFetchUserAction.FAILURE](state) {
    return {
      ...state,
      isLoading: false
    };
  },
  [authRemoveUserAction.TRIGGER](state) {
    return {
      ...state,
      user: null
    };
  }
});

export default authReducer;
