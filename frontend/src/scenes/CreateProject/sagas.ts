import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { createProject } from '../../services/project';
import { createProjectAction } from './actions';
import { CreateProject as Project } from './types/project';

interface ProjectAction extends Action {
  payload: string
}
function* createProjectRequest(action:ProjectAction) {
  try {
    const response: Project = yield call(createProject, action.payload);
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
