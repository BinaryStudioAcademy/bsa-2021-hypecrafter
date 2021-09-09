import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Project } from '../../common/types';
import { createProject } from '../../services/project';
import { getRecommendation } from '../../services/projects';
import {
  createProjectAction,
  fetchRecommendedProjectsAction,
  FetchRecommendedProjectsTriggerActionType
} from './actions';
import { RecommendedProject } from './types';

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

export default function* projectSaga() {
  yield all([
    watchCreateProjectRequest(),
    watchFetchRecommendedProjectsRequest()
  ]);
}
