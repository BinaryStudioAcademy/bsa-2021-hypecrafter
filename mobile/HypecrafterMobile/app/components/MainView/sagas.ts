import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Project, Topic } from '../../common/types';
import { getPopularAndRecommendedProjects } from '../../services/projects';
import { getTopics } from '../../services/topics';
import { fetchPopularAndRecommendedProjectsAction, fetchTopics as fetchTopicsAction } from './actions';

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

function* fetchTopics() {
  try {
    const response: Topic[] = yield call(getTopics);
    yield put(fetchTopicsAction.success(response));
  } catch (error) {
    yield put(fetchTopicsAction.failure(error as string));
  }
}

function* watchFetchTopics() {
  yield takeEvery(fetchTopicsAction.TRIGGER, fetchTopics);
}

export default function* mainPageSaga() {
  yield all([
    watchFetchPopularAndRecommendedProjectsRequest(),
    watchFetchTopics()
  ]);
}

