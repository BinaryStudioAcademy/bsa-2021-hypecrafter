import { all } from 'redux-saga/effects';
import mainPageSaga from '../components/MainView/sagas';
import userProfileSaga from '../components/UserView/sagas';
import projectPageSaga from '../components/ProjectView/sagas';
import authSaga from './auth';
import authenticationSaga from './login';

export default function* rootSaga() {
  yield all([
    authSaga(),
    mainPageSaga(),
    userProfileSaga(),
    authenticationSaga(),
    projectPageSaga()
  ]);
}