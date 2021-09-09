import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { CreateProject } from '../../common/types';
import { createProject, getForEditProject } from '../../services/project';
import { getRecommendation } from '../../services/projects';
import {
  createProjectAction, fetchRecommendedProjectsAction,
  FetchRecommendedProjectsTriggerActionType, getForEditProjectAction
} from './actions';
import { RecommendedProject } from './types';

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
    yield put(createProjectAction.failure(error as string));
  }
}

function* getForEditProjectRequest(action:ProjectForEditAction) {
  try {
    const response: CreateProject = yield call(getForEditProject, action.payload);
    yield put(getForEditProjectAction.success(response));
  } catch (error) {
    yield put(getForEditProjectAction.failure(error as string));
  }
}

function* watchCreateProjectRequest() {
  yield takeEvery(createProjectAction.TRIGGER, createProjectRequest);
}

function* fetchRecommendedProjectsRequest(action: FetchRecommendedProjectsTriggerActionType) {
  try {
    const response: RecommendedProject[] = yield call(getRecommendation, action.payload);
    yield put(fetchRecommendedProjectsAction.success(response));
  } catch (error) {
    yield put(fetchRecommendedProjectsAction.failure('Failed to load projects data'));
  }
}

function* watchFetchRecommendedProjectsRequest() {
  yield takeEvery(fetchRecommendedProjectsAction.TRIGGER, fetchRecommendedProjectsRequest);
}

function* watchGetForEditProjectRequest() {
  yield takeEvery(getForEditProjectAction.TRIGGER, getForEditProjectRequest);
}

export default function* projectSaga() {
  yield all([
    watchCreateProjectRequest(),
    watchFetchRecommendedProjectsRequest(),
    watchGetForEditProjectRequest()
  ]);
}
