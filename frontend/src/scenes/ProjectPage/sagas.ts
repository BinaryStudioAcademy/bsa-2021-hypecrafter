import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ProjectPage } from '../../common/types';
import { getProject, setReaction as setReactionServ } from '../../services/project';
import { fetchProject as fetchProjectAction, setReaction as setReactionAction } from './actions';

interface ProjectAction extends Action {
  payload: string
}

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

function* setReaction(action: ProjectAction) {
  try {
    const response: ProjectPage = yield call(setReactionServ, action.payload);
    yield put(setReactionAction.success(response));
  } catch (error) {
    yield put(setReactionAction.failure(error as string));
  }
}

function* watchSetReaction() {
  yield takeEvery(setReactionAction.TRIGGER, setReaction);
}

export default function* projectPageSaga() {
  yield all([
    watchFetchTopics(),
    watchSetReaction()
  ]);
}
