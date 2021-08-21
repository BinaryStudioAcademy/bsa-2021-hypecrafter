import { createReducer } from '../../../helpers';
import type { FetchClientSecretSuccess, SetFundActionTrigger } from './actions';
import { fetchClientSecretAction, setFundAction } from './actions';

export interface PaymentState {
  amount: number;
  isCustom: boolean;
  clientSecret: string;
}

export const initialState: PaymentState = {
  amount: 0,
  isCustom: false,
  clientSecret: ''
};

export const paymentReducer = createReducer<PaymentState>(initialState, {
  [setFundAction.TRIGGER](state, action: SetFundActionTrigger) {
    return {
      ...state,
      ...action.payload
    };
  },
  [fetchClientSecretAction.SUCCESS](state, action: FetchClientSecretSuccess) {
    return {
      ...state,
      ...action.payload
    };
  }
});

export default paymentReducer;
