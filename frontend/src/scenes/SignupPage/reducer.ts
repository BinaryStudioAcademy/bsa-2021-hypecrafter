import { Tokens } from '../../common/types/signup';
import { createReducer } from '../../helpers';
import type {
  RegisterUserFailureActionType, RegisterUserSuccessActionType
} from './actions';
import { registerUserAction } from './actions';

export interface RegistrationState {
  isLoading: boolean;
  tokens: Tokens | null;
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
