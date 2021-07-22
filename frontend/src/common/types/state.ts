import { UsersState } from '../../scenes/Users/reducer';

export interface Action<T = string, P = never> {
  type: T,
  payload: P
}

export type Reducer<TState> = (state: TState | undefined, action: Action) => TState

export interface StoreState {
  users: UsersState;
}
