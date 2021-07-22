import { call, put, takeEvery, all } from 'redux-saga/effects';
import { User } from '../../common/types';
import { getUsers } from '../../services/users';
import { fetchUsersAction } from './actions';

function* fetchUsersRequest() {
  try {
    const response: User[] = yield call(getUsers);
    yield put(fetchUsersAction.success(response));
  } catch (error) {
    yield put(fetchUsersAction.failure('Failed to load users'));
  }
}

function* watchFetchUsersRequest() {
  yield takeEvery(fetchUsersAction.TRIGGER, fetchUsersRequest);
}

export default function* usersSaga() {
  yield all([
    watchFetchUsersRequest()
  ]);
}

