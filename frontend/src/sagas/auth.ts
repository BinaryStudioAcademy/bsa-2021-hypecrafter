import { call, put, takeEvery, all } from 'redux-saga/effects';
import { auth } from '../services/auth';
import { User } from '../common/types';
import { authAction } from '../actions/auth';

function* authRequest() {
  const token: string | null = localStorage.getItem('ACCESS_TOKEN');
  if (token) {
    try {
      const response: User = yield call(auth, token);
      yield put(authAction.success(response));
    } catch (error) {
      yield put(authAction.failure('Failed to load users'));
    }
  } else {
    yield put(authAction.failure('No token'));
  }
}

function* watchAuthRequest() {
  yield takeEvery(authAction.TRIGGER, authRequest);
}

export default function* authSaga() {
  yield all([
    watchAuthRequest()
  ]);
}
