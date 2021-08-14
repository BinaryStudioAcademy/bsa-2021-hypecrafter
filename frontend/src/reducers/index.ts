import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';
import mainPageReducer, { mainPageState } from '../scenes/MainPage/reducer';
import userProfileReducer, { initialState as userProfileInitialState } from '../scenes/UserPage/reducer';
import transactionsReducer, { initialState as transactionsInitialState } from '../scenes/Wallet/Transactions/reducer';
import authReducer, { authState } from './auth';

const initialState: StoreState = {
  transactions: transactionsInitialState,
  mainPage: mainPageState,
  userProfile: userProfileInitialState,
  auth: authState,
  project: projectInitialState
};

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  userProfile: userProfileReducer,
  auth: authReducer,
  project: projectReduser,
  transactions: transactionsReducer
});

export { initialState, rootReducer };
