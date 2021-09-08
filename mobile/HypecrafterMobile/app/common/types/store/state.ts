import { AuthState } from '../../../reducers/auth';
import { MainPageState } from '../../../components/MainView/reducer';
import { UserProfileState } from '../../../components/UserView/reducer';

export interface StoreState {
  auth: AuthState;
  mainPage: MainPageState;
  userPage: UserProfileState;
}
