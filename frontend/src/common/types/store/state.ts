import { AuthState } from '../../../reducers/auth';
import { CategoriesState } from '../../../reducers/categies';
import { TagsState } from '../../../reducers/tags';
import { UsersState } from '../../../reducers/users';
import { AuthenticationState } from '../../../scenes/Auth/reducer';
import { ProjectState } from '../../../scenes/CreateProject/reducer';
import { MainPageState } from '../../../scenes/MainPage/reducer';
import { ProjectPageState } from '../../../scenes/ProjectPage/reducer';
import { ProjectsState } from '../../../scenes/Projects/reducer';
import { TrendsPageState } from '../../../scenes/TrendsPage/reducer';
import { UserProfileState } from '../../../scenes/UserPage/reducer';
import { PageState } from '../../../scenes/Wallet/Transactions/reducer';

export interface StoreState {
  mainPage: MainPageState;
  trendsPage: TrendsPageState;
  userProfile: UserProfileState;
  auth: AuthState;
  project: ProjectState;
  users: UsersState;
  categories: CategoriesState;
  tags: TagsState;
  projects: ProjectsState;
  projectPage: ProjectPageState;
  transactions: PageState
  authentication: AuthenticationState;
}
