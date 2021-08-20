import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getUsersAction } from '../actions';
import { UserProfile } from '../common/types';
import { getUsers } from '../services/users';

function* getUsersRequest() {
  try {
    const response: UserProfile[] = yield call(getUsers);
    yield put(getUsersAction.success(response));
  } catch (error) {
    yield put(getUsersAction.failure('Failed to load user data'));
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(getUsersAction.TRIGGER, getUsersRequest);
}

export default function* usersSaga() {
  yield all([
    watchGetUsersRequest()
  ]);
}
