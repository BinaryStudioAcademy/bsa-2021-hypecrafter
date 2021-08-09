import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
// import {Routine } from '@types/redux-saga-routines'
import { authFetchUserAction } from '../actions';

const actions = [authFetchUserAction];

const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(action => ({
        [action.name]: {
          trigger: bindActionCreators(action, dispatch),
          success: bindActionCreators(action, dispatch),
          failure: bindActionCreators(action, dispatch)
        }
      }));
    }

    return bindActionCreators(actions, dispatch);
  }, actions);
};

export default useActions;
