import { PageRow } from '../../../common/types';
import { createReducer } from '../../../helpers';
import type { FetchTransactionsActionSucces } from './actions';
import { fetchTransactionsPageAction } from './actions';

export interface PageState {
  isLoading: boolean;
  isLast: boolean;
  page: PageRow[];
  lastPage: number;
}

export const initialState: PageState = {
  isLoading: true,
  isLast: false,
  page: [],
  lastPage: 0
};

export const transactionsReducer = createReducer<PageState>(initialState, {
  [fetchTransactionsPageAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [fetchTransactionsPageAction.REQUEST](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [fetchTransactionsPageAction.SUCCESS](state, action: FetchTransactionsActionSucces) {
    return {
      ...state,
      page: [...state.page, ...action.payload.page],
      isLoading: false,
      isLast: action.payload.isLast,
      lastPage: state.lastPage + 1
    };
  }
});

export default transactionsReducer;