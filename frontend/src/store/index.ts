import createSagaMiddleware from 'redux-saga';
import { initialState, rootReducer } from '../reducers';
import rootSaga from '../sagas';
import configureStore from './store';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const store = configureStore({
  rootReducer,
  initialState,
  middlewares
});

sagaMiddleware.run(rootSaga);

export { store };
