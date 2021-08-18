import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Project } from '../../common/types';
import { getProjects } from '../../services/projects';
import { fetchProjectsAction, FetchProjectsTriggerActionType } from './actions';

function* fetchProjectsRequest(action: FetchProjectsTriggerActionType) {
  try {
    const response: Project[] = yield call(getProjects, action.payload);
    yield put(fetchProjectsAction.success(response));
  } catch (error) {
    yield put(fetchProjectsAction.failure('Failed to load projects data'));
  }
}

function* watchFetchProjectsRequest() {
  yield takeEvery(fetchProjectsAction.TRIGGER, fetchProjectsRequest);
}

export default function* projectsSaga() {
  yield all([
    watchFetchProjectsRequest()
  ]);
}
