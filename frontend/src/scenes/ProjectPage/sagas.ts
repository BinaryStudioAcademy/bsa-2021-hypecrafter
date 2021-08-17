import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ProjectPage } from '../../common/types';
import { getProject } from '../../services/project';
import { fetchProject as fetchProjectAction } from './actions';

interface ProjectAction extends Action {
  payload: string
}

function* fetchProjects(action: ProjectAction) {
  try {
    const response: ProjectPage = yield call(getProject, action.payload);
    yield put(fetchProjectAction.success(response));
  } catch (error) {
    yield put(fetchProjectAction.failure(error as string));
  }
}

function* watchFetchTopics() {
  yield takeEvery(fetchProjectAction.TRIGGER, fetchProjects);
}

export default function* projectPageSaga() {
  yield all([
    watchFetchTopics()
  ]);
}
