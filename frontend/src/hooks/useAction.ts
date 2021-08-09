import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { authFetchUserAction } from '../actions';

const actions = [authFetchUserAction];

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => actions.reduce((accumulator, action) => (
      Object.assign(
        accumulator,
        {
          [action.name]: bindActionCreators(action.trigger, dispatch)
        }
      )
    )),
    actions
  );
};
