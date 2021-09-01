import { createReducer } from '../../../helpers';
import type { SetFundActionTrigger } from './actions';
import { setFundAction } from './actions';

export interface PaymentState {
  amount: number;
  isCustom: boolean;
}

export const initialState: PaymentState = {
  amount: 0,
  isCustom: false
};

export const paymentReducer = createReducer<PaymentState>(initialState, {
  [setFundAction.TRIGGER](state, action: SetFundActionTrigger) {
    return {
      ...state,
      ...action.payload
    };
  }
});

export default paymentReducer;
