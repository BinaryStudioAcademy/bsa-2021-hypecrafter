import { all } from 'redux-saga/effects';
import authenticationSaga from '../scenes/Auth/sagas';
import projectSaga from '../scenes/CreateProject/sagas';
import mainPageSaga from '../scenes/MainPage/sagas';
import userProfileSaga from '../scenes/UserPage/sagas';
import transactionsPageSaga from '../scenes/Wallet/Transactions/sagas';
import authSaga from './auth';

export default function* rootSaga() {
  yield all([
    mainPageSaga(),
    userProfileSaga(),
    authSaga(),
    projectSaga(),
    transactionsPageSaga(),
    authenticationSaga()
  ]);
}
