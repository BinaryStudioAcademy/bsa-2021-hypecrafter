import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../store';
import LocalizationProvider from './localization';
import SocketProvider from './sockets';

const AppProvider: FunctionComponent = ({ children }) => (
  <LocalizationProvider>
    <Provider store={store}>
      <SocketProvider>
        <Router>
          {children}
        </Router>
      </SocketProvider>
    </Provider>
  </LocalizationProvider>
);

export default AppProvider;
