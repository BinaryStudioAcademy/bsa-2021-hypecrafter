import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Tokens } from '../../common/types/signup';
import { Action } from '../../common/types/store/action';
import { setAccessToken, setRefreshToken } from '../../helpers/localStorage';
import { register } from '../../services/register';
import { registerUserAction } from './actions';

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

export default function* registrationSaga() {
  yield all([
    watchFetchUsersRequest()
  ]);
}

