import { AuthState } from '../../../reducers/auth';
import { CategoriesState } from '../../../reducers/categies';
import { UsersState } from '../../../reducers/users';
import { ProjectState } from '../../../scenes/CreateProject/reducer';
import { MainPageState } from '../../../scenes/MainPage/reducer';
import { UserProfileState } from '../../../scenes/UserPage/reducer';

export interface StoreState {
  mainPage: MainPageState;
  userProfile: UserProfileState;
  auth: AuthState;
  project: ProjectState;
  users: UsersState;
  categories: CategoriesState;
}
