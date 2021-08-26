import { UserProfile } from '../../common/types';
import { createReducer } from '../../helpers';
import type {
  FetchUserProfileFailureActionType,
  FetchUserProfileSuccessActionType,
  OpenModalTriggerActionType,
  SetEditingTriggerActionType
} from './actions';
import {
  closeModalAction,
  fetchUserProfileAction,
  openModalAction,
  setEditingAction
} from './actions';

export interface UserProfileState {
  isLoading: boolean;
  id: string;
  item: UserProfile | undefined;
  isEditing: boolean;
  error: string;
}

export const initialState: UserProfileState = {
  isLoading: false,
  id: '',
  item: undefined,
  isEditing: false,
  error: ''
};

export const userProfileReducer = createReducer<UserProfileState>(initialState, {
  [fetchUserProfileAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [fetchUserProfileAction.SUCCESS](state, action: FetchUserProfileSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      item: action.payload
    };
  },
  [fetchUserProfileAction.FAILURE](state, action: FetchUserProfileFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
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
});

export default userProfileReducer;
