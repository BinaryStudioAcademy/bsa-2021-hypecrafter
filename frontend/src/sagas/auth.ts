import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  authFetchUserAction,
  updateUserProfileAction
} from '../actions/auth';
import { User } from '../common/types';
import { auth, updateUser } from '../services/auth';

interface UpdateUserProfileActionProps {
  payload: User
}

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

function* updateUserProfile(action: UpdateUserProfileActionProps) {
  try {
    const response: { success: true | undefined } = yield call(updateUser, action.payload);
    if (!response.success) throw Error();
    yield put(updateUserProfileAction.success(action.payload));
  } catch (error) {
    yield put(updateUserProfileAction.failure('Failed to update user data'));
  }
}

function* watchUpdateUserProfile() {
  yield takeEvery(updateUserProfileAction.trigger, updateUserProfile);
}

export default function* authSaga() {
  yield all([
    watchAuthFetchUserRequest(),
    watchUpdateUserProfile()
  ]);
}
