import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getTagsAction } from '../actions';
import { Category } from '../common/types';
import { getTags } from '../services/tags';

function* getTagsRequest() {
  try {
    const response: Category[] = yield call(getTags);
    yield put(getTagsAction.success(response));
  } catch (error) {
    yield put(getTagsAction.failure('Failed to load categories data'));
  }
}

function* watchGetTagsRequest() {
  yield takeEvery(getTagsAction.TRIGGER, getTagsRequest);
}

export default function* tagsSaga() {
  yield all([
    watchGetTagsRequest()
  ]);
}
