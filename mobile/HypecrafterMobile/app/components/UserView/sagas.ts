import { Action } from 'redux';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { UserProfile } from '../../common/types';
import { getUser } from '../../services/users';
import { fetchUserProfileAction } from './actions';

interface UserAction extends Action {
  payload: string
}

interface UpdateUserActionProps {
  payload: UserProfile
}

function* fetchUserProfileRequest(action: UserAction) {
  try {
    const response: UserProfile = yield call(getUser, action.payload);
    yield put(fetchUserProfileAction.success(response));
  } catch (error) {
    yield put(fetchUserProfileAction.failure('Failed to load user data'));
  }
}

function* watchFetchUserProfileRequest() {
  yield takeEvery(fetchUserProfileAction.TRIGGER, fetchUserProfileRequest);
}

export default function* userProfileSaga() {
  yield all([
    watchFetchUserProfileRequest()
  ]);
}
