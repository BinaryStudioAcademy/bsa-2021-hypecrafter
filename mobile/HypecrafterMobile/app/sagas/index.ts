import { all } from 'redux-saga/effects';
import mainPageSaga from '../components/MainView/sagas';
import userProfileSaga from '../components/UserView/sagas';
import authSaga from './auth';

export default function* rootSaga() {
  yield all([
    authSaga(),
    mainPageSaga(),
    userProfileSaga(),
  ]);
}