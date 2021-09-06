import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { createProject, getForEditProject } from '../../services/project';
import { createProjectAction, getForEditProjectAction } from './actions';
import { CreateProject } from '../../common/types';

interface ProjectAction extends Action {
  payload: string
}
interface ProjectForEditAction extends Action {
  payload:{
    id: string;
    userId: string;
  }
}
function* createProjectRequest(action:ProjectAction) {
  try {
    const response: CreateProject = yield call(createProject, action.payload);
    yield put(createProjectAction.success(response));
  } catch (error) {
    yield put(createProjectAction.failure(error));
  }
}

function* getForEditProjectRequest(action:ProjectForEditAction) {
  try {
    const response: CreateProject = yield call(getForEditProject, action.payload);
    yield put(getForEditProjectAction.success(response));
  } catch (error) {
    yield put(getForEditProjectAction.failure(error));
  }
}

function* watchCreateProjectRequest() {
  yield takeEvery(createProjectAction.TRIGGER, createProjectRequest);
}

function* watchGetForEditProjectRequest() {
  yield takeEvery(getForEditProjectAction.TRIGGER, getForEditProjectRequest);
}

export default function* projectSaga() {
  yield all([
    watchCreateProjectRequest(),
    watchGetForEditProjectRequest()
  ]);
}
