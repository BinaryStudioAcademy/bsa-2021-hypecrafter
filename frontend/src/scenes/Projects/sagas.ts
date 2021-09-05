import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  Project,
  ViewsAndInteractionTimeQuery,
  ViewsAndInteractionTimeResponse
} from '../../common/types';
import {
  getProjects,
  updateViewsAndInteraction
} from '../../services/projects';

import {
  fetchProjectsAction,
  FetchProjectsTriggerActionType,
  updateViewsAndInteractionTimeAction
} from './actions';

interface UpdateViewsAndInteractionTime extends Action {
  payload: ViewsAndInteractionTimeQuery
}

function* fetchProjectsRequest(action: FetchProjectsTriggerActionType) {
  try {
    const response: Project[] = yield call(getProjects, action.payload);
    yield put(fetchProjectsAction.success(response));
  } catch (error) {
    yield put(fetchProjectsAction.failure('Failed to load projects data'));
  }
}

function* watchFetchProjectsRequest() {
  yield takeEvery(fetchProjectsAction.TRIGGER, fetchProjectsRequest);
}

function* updateViewsAndInteractionTime(action: UpdateViewsAndInteractionTime) {
  try {
    const response: ViewsAndInteractionTimeResponse = yield call(updateViewsAndInteraction, action.payload);
    yield put(updateViewsAndInteractionTimeAction.success({ ...response, id: action.payload.id }));
  } catch (error) {
    yield put(updateViewsAndInteractionTimeAction.failure('Failed to update user data'));
  }
}

function* watchUpdateViewsAndInteractionTime() {
  yield takeEvery(updateViewsAndInteractionTimeAction.trigger, updateViewsAndInteractionTime);
}

export default function* projectsSaga() {
  yield all([
    watchFetchProjectsRequest(),
    watchUpdateViewsAndInteractionTime()
  ]);
}
