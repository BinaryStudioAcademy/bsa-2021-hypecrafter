import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../store';
import LocalizationProvider from './localization';
import SocketProvider from './sockets';

const AppProvider: FunctionComponent = ({ children }) => (
  <LocalizationProvider>
    <SocketProvider>
      <Provider store={store}>
        <Router>
          {children}
        </Router>
      </Provider>
    </SocketProvider>
  </LocalizationProvider>
);

export default AppProvider;
