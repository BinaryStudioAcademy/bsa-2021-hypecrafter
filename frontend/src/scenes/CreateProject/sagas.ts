import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Project } from '../../common/types';
import { createProject } from '../../services/project';
import { createProjectAction } from './actions';

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
