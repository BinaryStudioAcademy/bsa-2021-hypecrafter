import { all } from 'redux-saga/effects';
import usersSaga from '../scenes/Users/sagas';
import authSaga from './auth';
import projectsSaga from '../scenes/MainPage/sagas';

export default function* rootSaga() {
  yield all([
    projectsSaga(),
    usersSaga(),
    authSaga()
  ]);
}
