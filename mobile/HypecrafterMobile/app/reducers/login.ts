import { loginAction, logoutAction } from '../actions';
import type {
  LoginFailureActionType,
  LoginSuccessActionType,
  LogoutActionType
} from '../actions/login';
import { Tokens } from '../common/types/signup';
import { createReducer } from '../helpers';

export interface AuthenticationState {
  isLoading: boolean;
  tokens: Tokens | null;
  error: string;
}

export const authenticationState: AuthenticationState = {
  isLoading: false,
  tokens: null,
  error: ''
};

export const authenticationReducer = createReducer<AuthenticationState>(authenticationState, {
  [loginAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [loginAction.SUCCESS](state, action: LoginSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      tokens: action.payload
    };
  },
  [logoutAction.TRIGGER](state, action: LogoutActionType) {
    return {
      ...state,
      isLoading: false,
      tokens: null
    };
  },
  [loginAction.FAILURE](state, action: LoginFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }
});

export default authenticationReducer;
