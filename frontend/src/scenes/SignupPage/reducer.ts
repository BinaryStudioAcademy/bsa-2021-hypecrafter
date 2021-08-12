import { createReducer } from '../../helpers';
import { registerUserAction } from './actions';
import type {
  RegisterUserSuccessActionType,
  RegisterUserFailureActionType
} from './actions';

export interface RegistrationState {
  isLoading: boolean;
  tokens: { accessToken: string, refreshToken: string } | null;
  error: string;
}

export const initialState: RegistrationState = {
  isLoading: false,
  tokens: null,
  error: ''
};

export const registrationReducer = createReducer<RegistrationState>(initialState, {
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
  }
});

export default registrationReducer;
