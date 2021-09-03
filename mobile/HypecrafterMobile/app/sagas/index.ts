import { all } from 'redux-saga/effects';
import authSaga from './auth';
import authenticationSaga from './login';

export default function* rootSaga() {
  yield all([
    authSaga(),
    authenticationSaga()
  ]);
}