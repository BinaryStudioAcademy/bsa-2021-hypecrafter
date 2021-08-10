import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { Routine } from 'redux-saga-routines';
import * as actions from '../actions';

type TAccumulator = { [x: string]: Routine; }
type TActionsNameValue = [string, Routine]

export const useAction = () => {
  const dispatch = useDispatch();
  const actionsNameValue = Object.entries({ ...actions }) as TActionsNameValue[];

  return useMemo(
    () => actionsNameValue.reduce((accumulator: TAccumulator, [actionName, actionValue]) => (
      Object.assign(
        accumulator,
        {
          [actionName]: bindActionCreators(actionValue, dispatch)
        }
      )
    ), {}),
    actionsNameValue
  );
};
