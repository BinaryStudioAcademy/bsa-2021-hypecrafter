import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ProjectPage } from '../../common/types';
import { getProject, setReaction as setReactionServ, setWatch as setWatchServ } from '../../services/project';
import {
  fetchProject as fetchProjectAction,
  setReaction as setReactionAction,
  setWatch as setWatchAction
} from './actions';

interface ProjectAction extends Action {
  payload: string
}

interface ProjectReaction extends Action {
  payload: {
    isLiked: string | null,
    projectId: string
  }
}

interface ProjectWatch extends Action {
  payload: {
    isWatched: boolean,
    projectId: string
  }
}

interface ProjectReactionResponse { likes: string, dislikes: string }

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

function* setReaction(action: ProjectReaction) {
  try {
    const response: ProjectReactionResponse = yield call(setReactionServ, action.payload);
    yield put(setReactionAction.success(action.payload.isLiked, response.likes, response.dislikes));
  } catch (error) {
    yield put(setReactionAction.failure(error as string));
  }
}

function* watchSetReaction() {
  yield takeEvery(setReactionAction.TRIGGER, setReaction);
}

function* setWatch(action: ProjectWatch) {
  try {
    yield call(setWatchServ, action.payload);
    yield put(setWatchAction.success(action.payload.isWatched));
  } catch (error) {
    yield put(setWatchAction.failure(error as string));
  }
}

function* watchSetWatch() {
  yield takeEvery(setWatchAction.TRIGGER, setWatch);
}

export default function* projectPageSaga() {
  yield all([
    watchFetchTopics(),
    watchSetReaction(),
    watchSetWatch()
  ]);
}
