import { all } from 'redux-saga/effects';
import userProfileSaga from '../scenes/UserPage/sagas';
import usersSaga from '../scenes/Users/sagas';
import authSaga from './auth';
import projectSaga from '../scenes/CreateProject/sagas';

export default function* rootSaga() {
  yield all([
    userProfileSaga(),
    usersSaga(),
    authSaga(),
    projectSaga()
  ]);
}
