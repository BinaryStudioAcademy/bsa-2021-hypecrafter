import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import authenticationReducer, { initialState as authenticationInitialState } from '../scenes/Auth/reducer';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';
import mainPageReducer, { mainPageState } from '../scenes/MainPage/reducer';
import userProfileReducer, { initialState as userProfileInitialState } from '../scenes/UserPage/reducer';
import transactionsReducer, { initialState as transactionsInitialState } from '../scenes/Wallet/Transactions/reducer';
import authReducer, { authState } from './auth';
import categoriesReducer, { initialState as categoriesInitialState } from './categies';
import usersReducer, { initialState as usersInitialState } from './users';

const initialState: StoreState = {
  transactions: transactionsInitialState,
  mainPage: mainPageState,
  userProfile: userProfileInitialState,
  auth: authState,
  project: projectInitialState,
  users: usersInitialState,
  categories: categoriesInitialState,
  authentication: authenticationInitialState
};

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  userProfile: userProfileReducer,
  auth: authReducer,
  project: projectReduser,
  users: usersReducer,
  categories: categoriesReducer,
  transactions: transactionsReducer,
  authentication: authenticationReducer
});

export { initialState, rootReducer };
