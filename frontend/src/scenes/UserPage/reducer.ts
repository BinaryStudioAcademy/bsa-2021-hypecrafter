import { UserProfile } from '../../common/types';
import { createReducer } from '../../helpers';
import type { FetchUserProfileFailureActionType, FetchUserProfileSuccessActionType } from './actions';
import { fetchUserProfileAction } from './actions';

export interface UserProfileState {
  isLoading: boolean;
  item: UserProfile | undefined;
  error: string;
}

export const initialState: UserProfileState = {
  isLoading: false,
  item: undefined,
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
  }
});

export default userProfileReducer;
