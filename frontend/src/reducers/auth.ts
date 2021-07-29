import { User } from '../common/types';
import { createReducer } from '../helpers';
import { authAction } from '../actions/auth';
import type {
  AuthSuccessActionType,
  AuthFailureActionType
} from '../actions/auth';

export interface AuthState {
  isLoading: boolean;
  user: User | null;
  error: string;
}

export const authState: AuthState = {
  isLoading: false,
  user: null,
  error: ''
};

export const authReducer = createReducer<AuthState>(authState, {
  [authAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [authAction.SUCCESS](state, action: AuthSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      user: action.payload
    };
  },
  [authAction.FAILURE](state, action: AuthFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }
});

export default authReducer;
