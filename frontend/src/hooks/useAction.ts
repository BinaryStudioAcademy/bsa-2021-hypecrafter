import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { authFetchUserAction } from '../actions';

const actions = [authFetchUserAction];

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => actions.map(action => ({
      [action.name]: {
        trigger: bindActionCreators(action, dispatch),
        success: bindActionCreators(action, dispatch),
        failure: bindActionCreators(action, dispatch)
      }
    })),
    actions
  );
};
