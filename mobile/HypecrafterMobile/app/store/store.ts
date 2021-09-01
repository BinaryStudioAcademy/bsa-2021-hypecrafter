import {
  applyMiddleware, CombinedState, compose, createStore, Middleware
} from 'redux';
import type { Reducer, StoreState } from '../common/types';

interface ConfigureStoreParams {
  initialState: StoreState;
  middlewares: Middleware[];
  rootReducer: Reducer<CombinedState<StoreState>>;
}

const configureStore = (args: ConfigureStoreParams) => {
  const { initialState, middlewares, rootReducer } = args;
 
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  return store;
};

export default configureStore;
