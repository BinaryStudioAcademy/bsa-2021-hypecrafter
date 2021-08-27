import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Tokens } from '../../common/types/signup';
import { Action } from '../../common/types/store/action';
import { setAccessToken, setRefreshToken } from '../../helpers/localStorage';
import { googleAuth } from '../../services/googleAuth';
import { login } from '../../services/login';
import { register } from '../../services/register';
import { googleAuthAction, loginAction, registerUserAction } from './actions';

function* registerUserRequest(action: Action) {
  try {
    const response: Tokens = yield call(register, action.payload);
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    yield put(registerUserAction.success(response));
  } catch (error) {
    yield put(registerUserAction.failure('Failed register'));
  }
}

function* watchFetchUsersRequest() {
  yield takeEvery(registerUserAction.TRIGGER, registerUserRequest);
}

function* loginRequest(action: Action) {
  try {
    const response: Tokens = yield call(login, action.payload);
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    yield put(loginAction.success(response));
  } catch (error) {
    yield put(loginAction.failure('Failed login'));
  }
}

function* watchLoginRequest() {
  yield takeEvery(loginAction.TRIGGER, loginRequest);
}

function* googleAuthRequest(action: Action) {
  try {
    const response: Tokens = yield call(googleAuth, action.payload);
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    yield put(googleAuthAction.success(response));
  } catch (error) {
    yield put(googleAuthAction.failure('Failed login'));
  }
}

function* watchGoogleAuthRequest() {
  yield takeEvery(googleAuthAction.TRIGGER, googleAuthRequest);
}

export default function* authenticationSaga() {
  yield all([
    watchFetchUsersRequest(),
    watchLoginRequest(),
    watchGoogleAuthRequest()
  ]);
}
