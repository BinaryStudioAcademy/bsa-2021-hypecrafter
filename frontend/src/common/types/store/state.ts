import { UsersState } from '../../../scenes/Users/reducer';
import { AuthState } from '../../../reducers/auth';

export interface StoreState {
  users: UsersState;
  auth: AuthState;
}
