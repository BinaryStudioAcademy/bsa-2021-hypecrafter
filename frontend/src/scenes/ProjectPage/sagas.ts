import { TimeInterval } from 'hypecrafter-shared/enums';
import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Comment, CreateComment, ProjectPage } from '../../common/types';
import { Statistics } from '../../common/types/project/statistics';
import { addComment } from '../../services/comment';
import {
  getProject,
  getProjectsStatistics,
  setReaction,
  setWatch
} from '../../services/project';
import {
  addComment as addCommentAction,
  fetchProject as fetchProjectAction,
  fetchStatistics as fetchStatisticsAction,
  setReaction as setReactionAction,
  setWatch as setWatchAction
} from './actions';

interface AddCommentAction extends Action {
  payload: CreateComment;
}

interface FetchStatisticsAction extends Action {
  payload: {
    id: string;
    timeInterval: TimeInterval;
  };
}

interface ProjectAction extends Action {
  payload: {
    id: string;
    userId: string;
  };
}

interface ProjectReaction extends Action {
  payload: {
    isLiked: boolean | null;
    projectId: string;
  };
}

interface ProjectWatch extends Action {
  payload: {
    isWatched: boolean;
    projectId: string;
  };
}

interface ProjectReactionResponse {
  likes: number;
  dislikes: number;
}

function* fetchProject(action: ProjectAction) {
  try {
    const response: ProjectPage = yield call(getProject, action.payload);
    const additionalResponse: Statistics = yield call(getProjectsStatistics, {
      id: action.payload.id,
      timeInterval: TimeInterval.AllTime
    });
    yield put(fetchStatisticsAction.success(additionalResponse));
    yield put(fetchProjectAction.success(response));
  } catch (error) {
    yield put(fetchProjectAction.failure(error as string));
  }
}

function* watchFetchTopics() {
  yield takeEvery(fetchProjectAction.TRIGGER, fetchProject);
}

function* setReactionRequest(action: ProjectReaction) {
  try {
    const response: ProjectReactionResponse = yield call(setReaction, action.payload);
    yield put(setReactionAction.success(action.payload.isLiked, response.likes, response.dislikes));
  } catch (error) {
    yield put(setReactionAction.failure(error as string));
  }
}

function* watchSetReaction() {
  yield takeEvery(setReactionAction.TRIGGER, setReactionRequest);
}

function* setWatchRequest(action: ProjectWatch) {
  try {
    yield call(setWatch, action.payload);
    yield put(setWatchAction.success(action.payload.isWatched));
  } catch (error) {
    yield put(setWatchAction.failure(error as string));
  }
}

function* watchSetWatch() {
  yield takeEvery(setWatchAction.TRIGGER, setWatchRequest);
}

function* createComment(action: AddCommentAction) {
  try {
    const response: Comment = yield call(addComment, action.payload);
    yield put(addCommentAction.success(response));
  } catch (error) {
    yield put(addCommentAction.failure(error as string));
  }
}

function* watchCreateComment() {
  yield takeEvery(addCommentAction.TRIGGER, createComment);
}

function* fetchStatistics(action: FetchStatisticsAction) {
  try {
    const response: Statistics = yield call(
      getProjectsStatistics,
      action.payload
    );
    yield put(fetchStatisticsAction.success(response));
  } catch (error) {
    yield put(fetchStatisticsAction.failure(error as string));
  }
}

function* watchFetchStatistics() {
  yield takeEvery(fetchStatisticsAction.TRIGGER, fetchStatistics);
}

export default function* projectPageSaga() {
  yield all([
    watchFetchTopics(),
    watchSetReaction(),
    watchSetWatch(),
    watchCreateComment(),
    watchFetchStatistics()
  ]);
}
