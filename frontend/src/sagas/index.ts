import { all } from 'redux-saga/effects';
import projectSaga from '../scenes/CreateProject/sagas';
import mainPageSaga from '../scenes/MainPage/sagas';
import userProfileSaga from '../scenes/UserPage/sagas';
import authSaga from './auth';
import usersSaga from './users';

export default function* rootSaga() {
  yield all([
    mainPageSaga(),
    userProfileSaga(),
    authSaga(),
    projectSaga(),
    usersSaga()
  ]);
}
