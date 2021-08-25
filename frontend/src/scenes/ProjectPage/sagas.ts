import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Comment, CreateComment, ProjectPage } from '../../common/types';
import { addComment } from '../../services/comment';
import { getProject } from '../../services/project';
import {
  addComment as addCommentAction, fetchProject as fetchProjectAction
} from './actions';

interface ProjectAction extends Action {
  payload: string;
}

interface AddCommentAction extends Action {
  payload: CreateComment;
}

function* fetchProjects(action: ProjectAction) {
  try {
    const response: ProjectPage = yield call(getProject, action.payload);
    yield put(fetchProjectAction.success(response));
  } catch (error) {
    yield put(fetchProjectAction.failure(error as string));
  }
}

function* watchFetchTopics() {
  yield takeEvery(fetchProjectAction.TRIGGER, fetchProjects);
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

export default function* projectPageSaga() {
  yield all([watchFetchTopics(), watchCreateComment()]);
}
