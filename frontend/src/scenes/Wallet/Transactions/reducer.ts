import { PageRow } from '../../../common/types';
import { createReducer } from '../../../helpers';
import type { FetchTransactionsActionSucces } from './actions';
import { fetchTransactionsPageAction } from './actions';

export interface PageState {
  isLoading: boolean;
  isLast: boolean;
  page: PageRow[];
}

export const initialState: PageState = {
  isLoading: true,
  isLast: false,
  page: []
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
    let newPage = state.page;
    if (action.payload.isFirstPage) {
      newPage = action.payload.page;
    } else { newPage = [...state.page, ...action.payload.page]; }
    return {
      ...state,
      page: newPage,
      isLoading: false,
      isLast: action.payload.isLast
    };
  }
});

export default transactionsReducer;
