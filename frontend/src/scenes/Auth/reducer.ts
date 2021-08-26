import { Tokens } from '../../common/types/signup';
import { createReducer } from '../../helpers';
import type {
  FacebookAuthFailureActionType, FacebookAuthSuccessActionType, LoginFailureActionType,
  LoginSuccessActionType,
  RegisterUserFailureActionType,
  RegisterUserSuccessActionType
} from './actions';
import { facebookAuthAction, loginAction, registerUserAction } from './actions';

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
  [facebookAuthAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [facebookAuthAction.SUCCESS](state, action: FacebookAuthSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      tokens: action.payload
    };
  },
  [facebookAuthAction.FAILURE](state, action: FacebookAuthFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }
});

export default authenticationReducer;
