import { AuthState } from '../../../reducers/auth';
import { ProjectState } from '../../../scenes/CreateProject/reducer';
import { ProjectsState } from '../../../scenes/Projects/reducer';
import { UserProfileState } from '../../../scenes/UserPage/reducer';

export interface StoreState {
  userProfile: UserProfileState;
  auth: AuthState;
  project: ProjectState;
  projects: ProjectsState;
}
