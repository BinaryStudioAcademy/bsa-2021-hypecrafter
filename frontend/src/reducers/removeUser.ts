import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { authRemoveUserAction } from '../actions/auth';
import { store } from '../store';

export const removeUser = () => {
  const bindActions = bindActionCreators({ authRemoveUserAction }, store.dispatch as Dispatch<AnyAction>);
  return bindActions.authRemoveUserAction();
};
