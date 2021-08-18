import { call, put, takeEvery, all } from 'redux-saga/effects';
import { createProject } from '../../services/project';
import { createProjectAction } from './actions';
import { Project } from '../../common/types';

function* createProjectRequest() {
  try {
    const response: Project = yield call(createProject);
    yield put(createProjectAction.success(response));
  } catch (error) {
    yield put(createProjectAction.failure(error));
  }
}

function* watchCreateProjectRequest() {
  yield takeEvery(createProjectAction.TRIGGER, createProjectRequest);
}

export default function* projectSaga() {
  yield all([
    watchCreateProjectRequest()
  ]);
}
