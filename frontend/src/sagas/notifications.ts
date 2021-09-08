import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getNotificationsAction, setNotificationIsReadAction } from '../actions';
import { NotificationType } from '../common/types/notification/notification';
import { Action } from '../common/types/store/action';
import { getNotifications, setNotificationIsRead } from '../services/notifications';

function* setNotificationIsReadRequest(action: Action) {
  try {
    const response: { id: string } = yield call(setNotificationIsRead, action.payload);
    yield put(setNotificationIsReadAction.success(response.id));
  } catch (error) {
    yield put(setNotificationIsReadAction.failure());
  }
}

function* watchNotificationIsReadRequest() {
  yield takeEvery(setNotificationIsReadAction.TRIGGER, setNotificationIsReadRequest);
}

function* getNotificationsRequest(action: Action) {
  try {
    const response: Array<NotificationType> = yield call(getNotifications, action.payload);
    yield put(getNotificationsAction.success(response));
  } catch (error) {
    yield put(getNotificationsAction.failure());
  }
}

function* watchGetNotificationRequest() {
  yield takeEvery(getNotificationsAction.TRIGGER, getNotificationsRequest);
}

export default function* notificationsSaga() {
  yield all([
    watchNotificationIsReadRequest(),
    watchGetNotificationRequest()
  ]);
}
