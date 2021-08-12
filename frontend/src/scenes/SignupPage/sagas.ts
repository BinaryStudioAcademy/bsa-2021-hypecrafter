import { call, put, takeEvery, all } from 'redux-saga/effects';
import { register } from '../../services/register';
import { registerUserAction } from './actions';
import { Action } from '../../common/types/store/action';
import { StorageKeys } from '../../common/enums/storage-keys';

function* registerUserRequest(action: Action) {
  try {
    const response: { accessToken: string, refreshToken: string } = yield call(register, action.payload);
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, response.accessToken);
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, response.refreshToken);
    yield put(registerUserAction.success(response));
  } catch (error) {
    yield put(registerUserAction.failure('Failed register'));
  }
}

function* watchFetchUsersRequest() {
  yield takeEvery(registerUserAction.TRIGGER, registerUserRequest);
}

export default function* registrationSaga() {
  yield all([
    watchFetchUsersRequest()
  ]);
}

