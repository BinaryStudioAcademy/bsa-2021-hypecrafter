import createSagaMiddleware from 'redux-saga';
import configureStore from './store';
import { initialState, rootReducer } from '../reducers/rootReducer';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const store = configureStore({
  rootReducer,
  initialState,
  middlewares
});

sagaMiddleware.run(rootSaga);

export { store };
