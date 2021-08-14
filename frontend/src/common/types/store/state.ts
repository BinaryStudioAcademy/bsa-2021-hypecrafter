import { AuthState } from '../../../reducers/auth';
import { ProjectState } from '../../../scenes/CreateProject/reducer';
import { MainPageState } from '../../../scenes/MainPage/reducer';
import { UserProfileState } from '../../../scenes/UserPage/reducer';
import { PageState } from '../../../scenes/Wallet/Transactions/reducer';

export interface StoreState {
  mainPage: MainPageState;
  userProfile: UserProfileState;
  auth: AuthState;
  project: ProjectState;
  transactions: PageState
}
