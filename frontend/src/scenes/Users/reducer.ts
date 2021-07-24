import { User } from '../../common/types';
import { createReducer } from '../../helpers';
import { fetchUsersAction, removeUserByIdAction } from './actions';
import type {
  FetchUsersSuccessActionType,
  FetchUsersFailureActionType,
  RemoveUserByIdTriggerActionType
} from './actions';

export interface UsersState {
  isLoading: boolean;
  items: User[];
  error: string;
}

export const initialState: UsersState = {
  isLoading: false,
  items: [],
  error: ''
};

export const usersReducer = createReducer<UsersState>(initialState, {
  [fetchUsersAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [fetchUsersAction.SUCCESS](state, action: FetchUsersSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      items: action.payload
    };
  },
  [fetchUsersAction.FAILURE](state, action: FetchUsersFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  },
  [removeUserByIdAction.TRIGGER](state, action: RemoveUserByIdTriggerActionType) {
    return {
      ...state,
      items: state.items.filter(it => it.id !== action.payload)
    };
  }
});

export default usersReducer;
