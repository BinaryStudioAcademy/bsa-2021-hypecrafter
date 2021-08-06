import { call, put, takeEvery, all } from 'redux-saga/effects';
import { Project } from '../common/types';
import { getPopularProjects, getRecommendedProjects } from '../services/projects';
import { fetchPopularProjectsAction, fetchRecommendedProjectsAction } from '../actions/projects';

function* fetchPopularProjectsRequest() {
  try {
    const response: Project[] = yield call(getPopularProjects);
    yield put(fetchPopularProjectsAction.success(response));
  } catch (error) {
    yield put(fetchPopularProjectsAction.failure('Failed to load projects'));
  }
}

function* watchFetchPopularProjectsRequest() {
  yield takeEvery(fetchPopularProjectsAction.TRIGGER, fetchPopularProjectsRequest);
}

function* fetchRecommendedProjectsRequest() {
  try {
    const response: Project[] = yield call(getRecommendedProjects);
    yield put(fetchRecommendedProjectsAction.success(response));
  } catch (error) {
    yield put(fetchRecommendedProjectsAction.failure('Failed to load projects'));
  }
}

function* watchFetchRecommendedProjectsRequest() {
  yield takeEvery(fetchRecommendedProjectsAction.TRIGGER, fetchRecommendedProjectsRequest);
}

export default function* projectsSaga() {
  yield all([
    watchFetchPopularProjectsRequest(),
    watchFetchRecommendedProjectsRequest()
  ]);
}

