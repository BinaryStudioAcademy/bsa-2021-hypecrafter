import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { authRemoveUserAction } from '../actions/auth';
import { store } from '../store';

const bindActions = bindActionCreators({ authRemoveUserAction }, store.dispatch as Dispatch<AnyAction>);
export const removeUser = bindActions.authRemoveUserAction;
