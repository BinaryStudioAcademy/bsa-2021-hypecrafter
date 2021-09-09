import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import authenticationReducer, { initialState as authenticationInitialState } from '../scenes/Auth/reducer';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';
import donateReducer, { initialState as donateInitialState } from '../scenes/Donate/reducer';
import mainPageReducer, { mainPageState } from '../scenes/MainPage/reducer';
import projectPageReducer, { projectPageState } from '../scenes/ProjectPage/reducer';
import projectsReducer, { initialState as projectsInitialState } from '../scenes/Projects/reducer';
import trendsPageReducer, {
  trendsPageState
} from '../scenes/TrendsPage/reducer';
import userProfileReducer, { initialState as userProfileInitialState } from '../scenes/UserPage/reducer';
import paymentReducer, { initialState as paymentInitialState } from '../scenes/Wallet/Payment/reducer';
import transactionsReducer, { initialState as transactionsInitialState } from '../scenes/Wallet/Transactions/reducer';
import authReducer, { authState } from './auth';
import categoriesReducer, { initialState as categoriesInitialState } from './categies';
import notificationsReducer, { initialState as notificationsState } from './notifications';
import searchReducer, { initialState as searchInitialState } from './search';
import { initialState as tagsInitialState, tagsReduser } from './tags';
import usersReducer, { initialState as usersInitialState } from './users';

const initialState: StoreState = {
  notifications: notificationsState,
  transactions: transactionsInitialState,
  mainPage: mainPageState,
  userProfile: userProfileInitialState,
  auth: authState,
  project: projectInitialState,
  users: usersInitialState,
  categories: categoriesInitialState,
  projects: projectsInitialState,
  trendsPage: trendsPageState,
  projectPage: projectPageState,
  authentication: authenticationInitialState,
  tags: tagsInitialState,
  payment: paymentInitialState,
  donate: donateInitialState,
  search: searchInitialState
};

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  trendsPage: trendsPageReducer,
  userProfile: userProfileReducer,
  auth: authReducer,
  project: projectReduser,
  users: usersReducer,
  categories: categoriesReducer,
  projects: projectsReducer,
  projectPage: projectPageReducer,
  transactions: transactionsReducer,
  authentication: authenticationReducer,
  tags: tagsReduser,
  payment: paymentReducer,
  donate: donateReducer,
  search: searchReducer,
  notifications: notificationsReducer
});

export { initialState, rootReducer };
