import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { postDonate } from '../../services/donate';
import { executeDonateAction, showDonateModalAction } from './actions';

interface DonateAction extends Action {
  payload: {
    projectId: string,
    amount: number
  }
}

function* setDonate(action: DonateAction) {
  try {
    const { projectId, amount } = action.payload;
    console.log(projectId, amount);
    yield put(showDonateModalAction.request());
    const { success }:{ success: boolean } = yield call(postDonate, projectId, amount);
    if (success) { yield put(showDonateModalAction.success()); } else yield put(showDonateModalAction.failure());
  } catch (error) {
    console.log(error.message);
    yield put(showDonateModalAction.failure());
  }
}

function* watchDonateRequest() {
  yield takeEvery(executeDonateAction.TRIGGER, setDonate);
}

export default function* donateSaga() {
  yield all([
    watchDonateRequest()
  ]);
}
