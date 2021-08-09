import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import {authFetchUserAction} from '../actions';

const actions = [
  authFetchUserAction.trigger,
  authFetchUserAction.success,
  authFetchUserAction.failure,
]

const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(action => bindActionCreators(action, dispatch))
    }

    return bindActionCreators(actions, dispatch)
  }, actions)
}

export default useActions;
