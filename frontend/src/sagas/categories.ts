import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getCategoriesAction } from '../actions';
import { Categories } from '../common/types';
import { getCategories } from '../services/categories';

function* getCategoriesRequest() {
  try {
    const response: Categories[] = yield call(getCategories);
    yield put(getCategoriesAction.success(response));
  } catch (error) {
    yield put(getCategoriesAction.failure('Failed to load categories data'));
  }
}

function* watchGetCategoriesRequest() {
  yield takeEvery(getCategoriesAction.TRIGGER, getCategoriesRequest);
}

export default function* categoriesSaga() {
  yield all([
    watchGetCategoriesRequest()
  ]);
}
