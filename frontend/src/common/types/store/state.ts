import { UserProfileState } from '../../../scenes/UserPage/reducer';
import { UsersState } from '../../../scenes/Users/reducer';
import { AuthState } from '../../../reducers/auth';
import { ProjectState } from '../../../scenes/CreateProject/reducer';

export interface StoreState {
  users: UsersState;
  userProfile: UserProfileState;
  auth: AuthState;
  project: ProjectState;
}
