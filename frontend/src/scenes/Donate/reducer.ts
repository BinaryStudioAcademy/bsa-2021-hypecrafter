import { createReducer } from '../../helpers';
import { hideDonateModalAction, showDonateModalAction, ShowDonateModalActionTrigger } from './actions';

export interface DonateState {
  projectId: string;
  donateState: 'success' | 'failure' | 'show' | 'hide' | 'loading';
}

export const initialState: DonateState = {
  projectId: '',
  donateState: 'show'
};

export const donateReducer = createReducer<DonateState>(initialState, {
  [showDonateModalAction.TRIGGER](state: DonateState, action: ShowDonateModalActionTrigger) {
    return {
      ...state,
      projectId: action.payload.projectId,
      donateState: 'show'
    };
  },
  [showDonateModalAction.REQUEST](state: DonateState) {
    return {
      ...state,
      donateState: 'loading'
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
      donateState: 'hide',
      projectId: ''
    };
  }
});

export default donateReducer;
