import { createReducer } from '../../../helpers';
import type { GetTransactionsActionSucces } from './actions';
import { getTransactionsPage } from './actions';
import { PageRow } from './utils';

export interface PageState {
  isLoading: boolean;
  isLast: true;
  page: PageRow[];
}

export const initialState: PageState = {
  isLoading: false,
  isLast: true,
  page: []
};

export const transactionsReducer = createReducer<PageState>(initialState, {
  [getTransactionsPage.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [getTransactionsPage.REQUEST](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [getTransactionsPage.SUCCESS](state, action: GetTransactionsActionSucces) {
    return {
      ...state,
      page: action.payload.page,
      isLoading: true
    };
  }
});

export default transactionsReducer;
