import { call, put, takeEvery, all } from 'redux-saga/effects';
import { auth } from '../services/auth';
import { User } from '../common/types';
import { authAction } from '../actions/auth';
import { StorageKeys } from '../common/enums/storage-keys';

function* authRequest() {
  const token: string = <string>localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  try {
    const response: User = yield call(auth, token);
    yield put(authAction.success(response));
  } catch (error) {
    yield put(authAction.failure());
  }
}

function* watchAuthRequest() {
  yield takeEvery(authAction.TRIGGER, authRequest);
}

export default function* authSaga() {
  yield all([watchAuthRequest()]);
}
