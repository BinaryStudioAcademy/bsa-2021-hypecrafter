import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import authReducer, { authState } from './auth';
import mainPageReducer, { mainPageState } from '../components/MainView/reducer';
import userProfileReducer, { initialState as UserProfileState } from '../components/UserView/reducer';

const initialState: StoreState = {
  auth: authState,
  mainPage: mainPageState,
  userPage: UserProfileState,
};

const rootReducer = combineReducers({
  auth: authReducer,
  mainPage: mainPageReducer,
  userPage: userProfileReducer,
});

export { initialState, rootReducer };
