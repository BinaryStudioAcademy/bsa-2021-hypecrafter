import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ProjectPage } from '../../common/types';
import { getProject, setReaction, setWatch } from '../../services/project';
import {
  fetchProject as fetchProjectAction,
  setReaction as setReactionAction,
  setWatch as setWatchAction
} from './actions';

interface ProjectAction extends Action {
  payload: {
    id: string;
    userId: string;
  }
}

interface ProjectReaction extends Action {
  payload: {
    isLiked: boolean | null,
    projectId: string
  }
}

interface ProjectWatch extends Action {
  payload: {
    isWatched: boolean,
    projectId: string
  }
}

interface ProjectReactionResponse { likes: number, dislikes: number }

function* fetchProject(action: ProjectAction) {
  try {
    const response: ProjectPage = yield call(getProject, action.payload);
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

export default function* projectPageSaga() {
  yield all([
    watchFetchTopics(),
    watchSetReaction(),
    watchSetWatch(),
  ]);
}
