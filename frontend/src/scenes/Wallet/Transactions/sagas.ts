import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { TransactionsPage } from '../../../common/types';
import { getPage } from '../../../services/transactions';
import { fetchTransactionsPageAction } from './actions';

interface TransactionAction extends Action {
  payload: {
    userId: string;
    lastPage: number
  }
}

function* fetchTransactionsPage(action: TransactionAction) {
  try {
    console.log(action.payload);
    const { userId, lastPage } = action.payload;
    console.log(userId, lastPage);
    const transactionsPage: TransactionsPage = yield call(getPage, userId, lastPage + 1);
    yield put(fetchTransactionsPageAction.success(transactionsPage));
  } catch (error) {
    console.log(error.message);
    yield put(fetchTransactionsPageAction.failure('Failed to transactions data'));
  }
}

function* watchTransactionsPageRequest() {
  yield takeEvery(fetchTransactionsPageAction.TRIGGER, fetchTransactionsPage);
}

export default function* TransactionsPageSaga() {
  yield all([
    watchTransactionsPageRequest()
  ]);
}
