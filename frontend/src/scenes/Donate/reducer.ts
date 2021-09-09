import { createReducer } from '../../helpers';
import { hideDonateModalAction, showDonateModalAction, ShowDonateModalActionTrigger } from './actions';

export interface DonateState {
  projectId: string;
  donateState: 'success' | 'failure' | 'show' | 'hide';
}

export const initialState: DonateState = {
  projectId: '',
  donateState: 'hide'
};

export const transactionsReducer = createReducer<DonateState>(initialState, {
  [showDonateModalAction.TRIGGER](state: DonateState, action: ShowDonateModalActionTrigger) {
    return {
      ...state,
      projectId: action.payload.projectId,
      donateState: 'show'
    };
  },
  [showDonateModalAction.SUCCESS](state: DonateState) {
    return {
      ...state,
      donateState: 'success'
    };
  },
  [showDonateModalAction.FAILURE](state: DonateState) {
    return {
      ...state,
      donateState: 'failure'
    };
  },
  [hideDonateModalAction.TRIGGER](state: DonateState) {
    return {
      ...state,
      ...initialState
    };
  }
});

export default transactionsReducer;
