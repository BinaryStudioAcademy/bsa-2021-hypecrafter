import { PageRow } from '../../../common/types';
import { createReducer } from '../../../helpers';
import { clearTransactionsStateAction, FetchTransactionsActionSucces, fetchTransactionsPageAction } from './actions';

export interface TransactionsState {
  isLoading: boolean;
  isLast: boolean;
  page: PageRow[];
}

export const initialState: TransactionsState = {
  isLoading: true,
  isLast: false,
  page: []
};

export const transactionsReducer = createReducer<TransactionsState>(initialState, {
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
      isLast: action.payload.isLast
    };
  },
  [clearTransactionsStateAction.TRIGGER]() {
    return initialState;
  }
});

export default transactionsReducer;
