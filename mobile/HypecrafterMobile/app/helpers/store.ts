import { Action, Reducer } from '../common/types';

type Handlers<TState> = {
  [key: string]: (state: TState, action: Action) => TState;
};

export function createReducer<TState>(
  initialState: TState,
  handlers: Handlers<TState>
): Reducer<TState> {
  return (state = initialState, action: Action): TState => {
    if (action.type in handlers) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
