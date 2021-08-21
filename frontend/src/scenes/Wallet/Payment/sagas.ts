import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ClientSecretData } from '../../../common/types/payment';
import { getClientSecret } from '../../../services/payment';
import { fetchClientSecretAction } from './actions';

interface PaymentAction extends Action {
  payload: {
    amount: number;
  }
}

function* fetchClientSecret(action: PaymentAction) {
  try {
    const { amount } = action.payload;
    const params: ClientSecretData = { amount: JSON.stringify(amount) };
    console.log(params);
    const clientSecret: string = yield call(getClientSecret, params);
    console.log(clientSecret);
    yield put(fetchClientSecretAction.success(clientSecret));
  } catch (error) {
    console.log(error.message);
    yield put(fetchClientSecretAction.failure('Failed to transactions data'));
  }
}

function* watchClientSecretRequest() {
  yield takeEvery(fetchClientSecretAction.TRIGGER, fetchClientSecret);
}

export default function* clientSecretSaga() {
  yield all([
    watchClientSecretRequest()
  ]);
}
