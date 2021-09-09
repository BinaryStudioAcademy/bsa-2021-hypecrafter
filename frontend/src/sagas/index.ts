import { all } from 'redux-saga/effects';
import authenticationSaga from '../scenes/Auth/sagas';
import projectSaga from '../scenes/CreateProject/sagas';
import donateSaga from '../scenes/Donate/sagas';
import mainPageSaga from '../scenes/MainPage/sagas';
import projectPageSaga from '../scenes/ProjectPage/sagas';
import projectsSaga from '../scenes/Projects/sagas';
import trendsPageSaga from '../scenes/TrendsPage/sagas';
import userProfileSaga from '../scenes/UserPage/sagas';
import transactionsPageSaga from '../scenes/Wallet/Transactions/sagas';
import authSaga from './auth';
import categoriesSaga from './categories';
import tagsSaga from './tags';
import usersSaga from './users';

export default function* rootSaga() {
  yield all([
    mainPageSaga(),
    userProfileSaga(),
    authSaga(),
    projectSaga(),
    usersSaga(),
    categoriesSaga(),
    projectsSaga(),
    trendsPageSaga(),
    projectPageSaga(),
    transactionsPageSaga(),
    authenticationSaga(),
    tagsSaga(),
    donateSaga()
  ]);
}
