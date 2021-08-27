import { Tokens } from '../../common/types/signup';
import { createReducer } from '../../helpers';
import type {
  LoginFailureActionType,
  LoginSuccessActionType,
  RegisterUserFailureActionType,
  RegisterUserSuccessActionType
} from './actions';
import { googleAuthAction, loginAction, registerUserAction } from './actions';

export interface AuthenticationState {
  isLoading: boolean;
  tokens: Tokens | null;
  error: string;
}

export const initialState: AuthenticationState = {
  isLoading: false,
  tokens: null,
  error: ''
};

export const authenticationReducer = createReducer<AuthenticationState>(initialState, {
  [registerUserAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [registerUserAction.SUCCESS](state, action: RegisterUserSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      tokens: action.payload
    };
  },
  [registerUserAction.FAILURE](state, action: RegisterUserFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  },
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
  [loginAction.FAILURE](state, action: LoginFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  },
  [googleAuthAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [googleAuthAction.SUCCESS](state, action: LoginSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      tokens: action.payload
    };
  },
  [googleAuthAction.FAILURE](state, action: LoginFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }
});

export default authenticationReducer;
