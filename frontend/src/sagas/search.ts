import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { searchAction } from '../actions';
import { SearchResult } from '../common/types';
import { search } from '../services/search';

interface ProjectAction extends Action {
  payload: { query: string }
}

function* SearchRequest(params:ProjectAction) {
  try {
    const response: SearchResult[] = yield call(search, params.payload);
    yield put(searchAction.success(response));
  } catch (error) {
    yield put(searchAction.failure('Failed to load categories data'));
  }
}

function* watchSearchRequest() {
  yield takeEvery(searchAction.TRIGGER, SearchRequest);
}

export default function* searchSaga() {
  yield all([
    watchSearchRequest()
  ]);
}
