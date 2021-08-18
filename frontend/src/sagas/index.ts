import { all } from 'redux-saga/effects';
import projectSaga from '../scenes/CreateProject/sagas';
import mainPageSaga from '../scenes/MainPage/sagas';
import projectsSaga from '../scenes/Projects/sagas';
import registrationSaga from '../scenes/SignupPage/sagas';
import userProfileSaga from '../scenes/UserPage/sagas';
import authSaga from './auth';

export default function* rootSaga() {
  yield all([
    mainPageSaga(),
    userProfileSaga(),
    authSaga(),
    projectSaga(),
    projectsSaga(),
    registrationSaga(),
  ]);
}
