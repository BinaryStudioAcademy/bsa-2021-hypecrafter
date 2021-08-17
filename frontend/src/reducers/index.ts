import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import projectReduser, {
  initialState as projectInitialState
} from '../scenes/CreateProject/reducer';
import mainPageReducer, { mainPageState } from '../scenes/MainPage/reducer';
import trendsPageReducer, {
  trendsPageState
} from '../scenes/TrendsPage/reducer';
import userProfileReducer, {
  initialState as userProfileInitialState
} from '../scenes/UserPage/reducer';
import authReducer, { authState } from './auth';

const initialState: StoreState = {
  mainPage: mainPageState,
  userProfile: userProfileInitialState,
  auth: authState,
  project: projectInitialState,
  trendsPage: trendsPageState
};

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  trendsPage: trendsPageReducer,
  userProfile: userProfileReducer,
  auth: authReducer,
  project: projectReduser
});

export { initialState, rootReducer };
