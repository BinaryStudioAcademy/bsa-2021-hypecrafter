import { all } from 'redux-saga/effects';
import usersSaga from '../scenes/Users/sagas';
import authSaga from './auth';
import projectSaga from '../scenes/CreateProject/sagas';
import registrationSaga from '../scenes/SignupPage/sagas';

export default function* rootSaga() {
  yield all([
    usersSaga(),
    authSaga(),
    projectSaga(),
    registrationSaga()
  ]);
}
