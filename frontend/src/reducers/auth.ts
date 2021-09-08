import type {
  AuthFetchUserSuccessActionType,
  OpenModalTriggerActionType,
  SetEditingTriggerActionType,
  UpdateUserProfileSuccessActionType,
  UpdateUserProfileFailureActionType
} from '../actions/auth';
import {
  authFetchUserAction,
  authRemoveUserAction,
  openModalAction,
  closeModalAction,
  setEditingAction,
  updateUserProfileAction
} from '../actions/auth';
import { User } from '../common/types';
import { createReducer } from '../helpers';

export interface AuthState {
  isLoading: boolean;
  isEditing: boolean;
  user: User | null;
  id: string;
}

export const authState: AuthState = {
  isLoading: false,
  isEditing: false,
  user: null,
  id: ''
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
  },
  [authRemoveUserAction.TRIGGER](state) {
    return {
      ...state,
      user: null
    };
  },
  [openModalAction.TRIGGER](state, action: OpenModalTriggerActionType) {
    return {
      ...state,
      id: action.payload
    };
  },
  [closeModalAction.TRIGGER](state) {
    return {
      ...state,
      id: ''
    };
  },
  [setEditingAction.TRIGGER](state, action: SetEditingTriggerActionType) {
    return {
      ...state,
      isEditing: action.payload
    };
  },
  [updateUserProfileAction.TRIGGER](state) {
    return {
      ...state,
      isEditing: false
    };
  },
  [updateUserProfileAction.SUCCESS](state, action: UpdateUserProfileSuccessActionType) {
    return {
      ...state,
      user: action.payload
    };
  },
  [updateUserProfileAction.FAILURE](state, action: UpdateUserProfileFailureActionType) {
    return {
      ...state,
      error: action.payload
    };
  }
});

export default authReducer;
