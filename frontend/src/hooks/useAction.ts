import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

export const useAction = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions]
  );
};
