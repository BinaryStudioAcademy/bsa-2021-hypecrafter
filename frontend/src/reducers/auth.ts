import { User } from '../common/types';
import { createReducer } from '../helpers';
import { authFetchUserAction } from '../actions/auth';
import type {
  AuthFetchUserSuccessActionType
} from '../actions/auth';

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
  }
});

export default authReducer;
