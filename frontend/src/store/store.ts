import { applyMiddleware, CombinedState, compose, createStore, Middleware } from 'redux';
import type { Reducer, StoreState } from '../common/types';

interface ConfigureStoreParams {
  initialState: StoreState;
  middlewares: Middleware[];
  rootReducer: Reducer<CombinedState<StoreState>>;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const configureStore = (args: ConfigureStoreParams) => {
  const { initialState, middlewares, rootReducer } = args;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
};

export default configureStore;
