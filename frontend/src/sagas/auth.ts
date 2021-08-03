import { call, put, takeEvery, all } from 'redux-saga/effects';
import { auth } from '../services/auth';
import { User } from '../common/types';
import { authFetchUserAction } from '../actions/auth';

function* authFetchUserRequest() {
  try {
    const response: User = yield call(auth);
    yield put(authFetchUserAction.success(response));
  } catch (error) {
    yield put(authFetchUserAction.failure());
  }
}

function* watchAuthFetchUserRequest() {
  yield takeEvery(authFetchUserAction.TRIGGER, authFetchUserRequest);
}

export default function* authSaga() {
  yield all([watchAuthFetchUserRequest()]);
}
