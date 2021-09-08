import { all, call, put, takeEvery } from 'redux-saga/effects';
import { loginAction } from '../actions';
import { StorageKeys } from '../common/enums/storage-keys';
import { Tokens } from '../common/types';
import { Action } from '../common/types/store/action';
import { login } from '../services/login';
import Storage from '../storage';

function* loginRequest(action: Action) {
  try {
    const response: Tokens = yield call(login, action.payload);
    Storage.set(StorageKeys.ACCESS_TOKEN, response.accessToken);
    Storage.set(StorageKeys.REFRESH_TOKEN, response.refreshToken);
    yield put(loginAction.success(response));
  } catch (error) {
    yield put(loginAction.failure('Failed login'));
  }
}

function* watchLoginRequest() {
  yield takeEvery(loginAction.TRIGGER, loginRequest);
}

export default function* authenticationSaga() {
  yield all([
    watchLoginRequest()
  ]);
}
