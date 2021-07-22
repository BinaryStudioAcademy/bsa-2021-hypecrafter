import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

const AppProvider: FunctionComponent = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default AppProvider;
