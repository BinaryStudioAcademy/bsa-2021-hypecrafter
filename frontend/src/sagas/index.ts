import { all } from 'redux-saga/effects';
import usersSaga from '../scenes/Users/sagas';
import authSaga from './auth';
import mainPageSaga from '../scenes/MainPage/sagas';
import projectSaga from '../scenes/CreateProject/sagas';

export default function* rootSaga() {
  yield all([
    mainPageSaga(),
    usersSaga(),
    authSaga(),
    projectSaga()
  ]);
}
