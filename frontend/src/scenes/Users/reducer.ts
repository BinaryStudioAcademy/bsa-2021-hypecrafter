import { User } from '../../common/types';
import { createReducer } from '../../helpers';
import { fetchUsersAction, removeUserByIdAction } from './actions';
import type {
  FetchUsersSuccessActionType,
  FetchUsersFailureActionType,
  RemoveUserByIdTriggerActionType
} from './actions';

export interface UsersState {
  loading: boolean;
  items: User[];
  error: string;
}

export const initialState: UsersState = {
  loading: false,
  items: [],
  error: ''
};

export const usersReducer = createReducer<UsersState>(initialState, {
  [fetchUsersAction.TRIGGER](state) {
    return {
      ...state,
      loading: true
    };
  },
  [fetchUsersAction.SUCCESS](state, action: FetchUsersSuccessActionType) {
    return {
      ...state,
      loading: false,
      items: action.payload
    };
  },
  [fetchUsersAction.FAILURE](state, action: FetchUsersFailureActionType) {
    return {
      ...state,
      loading: false,
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
