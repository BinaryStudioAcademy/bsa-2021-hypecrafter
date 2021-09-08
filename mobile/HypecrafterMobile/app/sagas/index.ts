import { all } from 'redux-saga/effects';
import mainPageSaga from '../components/MainView/sagas';
import projectPageSaga from '../components/ProjectView/sagas';
import authSaga from './auth';
import authenticationSaga from './login';

export default function* rootSaga() {
  yield all([
    authSaga(),
    authenticationSaga(),
    mainPageSaga(),
    projectPageSaga()
  ]);
}