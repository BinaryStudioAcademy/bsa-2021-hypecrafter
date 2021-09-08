import { searchAction } from '../actions';
import { SearchResult } from '../common/types';
import { createReducer } from '../helpers';
import type {
  SearchFailureActionType,
  SearchSuccessActionType
} from '../actions/search';

export interface SearchState{
  isLoading: boolean;
  searchResult: SearchResult[];
  error: string;
}

export const initialState: SearchState = {
  isLoading: false,
  searchResult: [],
  error: '',
};

export const searchReduser = createReducer<SearchState>(initialState, {
  [searchAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [searchAction.SUCCESS](state, action: SearchSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      searchResult: action.payload
    };
  },
  [searchAction.FAILURE](state, action: SearchFailureActionType) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }
});

export default searchReduser;
