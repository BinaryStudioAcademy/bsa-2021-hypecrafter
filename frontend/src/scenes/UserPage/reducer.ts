import { User } from '../../common/types';
import { createReducer } from '../../helpers';
import { fetchUserProfileAction } from './actions';
import type { FetchUserProfileSuccessActionType, FetchUserProfileFailureActionType } from './actions';

export interface UserProfileState {
  isLoading: boolean;
  item: User | undefined;
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
