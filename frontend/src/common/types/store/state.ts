import { UsersState } from '../../../scenes/Users/reducer';
import { AuthState } from '../../../reducers/auth';
import { MainPageState } from '../../../scenes/MainPage/reducer';
import { ProjectState } from '../../../scenes/CreateProject/reducer';

export interface StoreState {
  mainPage: MainPageState;
  users: UsersState;
  auth: AuthState;
  project: ProjectState;
}
