import { Action } from './action';

export type Reducer<TState> = (state: TState | undefined, action: Action) => TState
