import { call, put, takeEvery, all } from 'redux-saga/effects';
import { Project } from '../../common/types';
import { getPopularAndRecommendedProjects } from '../../services/projects';
import { fetchPopularAndRecommendedProjectsAction } from './actions';

function* fetchPopularAndRecommendedProjectsRequest() {
  try {
    const response: { popular: Project[], recommended: Project[] } = yield call(getPopularAndRecommendedProjects);
    yield put(fetchPopularAndRecommendedProjectsAction.success(response));
  } catch (error) {
    yield put(fetchPopularAndRecommendedProjectsAction.failure(error as string));
  }
}

function* watchFetchPopularAndRecommendedProjectsRequest() {
  yield takeEvery(fetchPopularAndRecommendedProjectsAction.TRIGGER, fetchPopularAndRecommendedProjectsRequest);
}

export default function* mainPageSaga() {
  yield all([
    watchFetchPopularAndRecommendedProjectsRequest()
  ]);
}

