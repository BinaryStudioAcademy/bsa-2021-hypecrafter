import { all } from 'redux-saga/effects';
import projectSaga from '../scenes/CreateProject/sagas';
import mainPageSaga from '../scenes/MainPage/sagas';
import projectPageSaga from '../scenes/ProjectPage/sagas';
import userProfileSaga from '../scenes/UserPage/sagas';
import authSaga from './auth';
import categoriesSaga from './categories';
import usersSaga from './users';

export default function* rootSaga() {
  yield all([
    mainPageSaga(),
    userProfileSaga(),
    authSaga(),
    projectSaga(),
    usersSaga(),
    categoriesSaga(),
    projectPageSaga(),
    transactionsPageSaga(),
    authenticationSaga()
  ]);
}
