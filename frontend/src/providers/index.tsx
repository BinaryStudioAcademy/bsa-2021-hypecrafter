import { FunctionComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import LocalizationProvider from './localization';

const AppProvider: FunctionComponent = ({ children }) => (
  <LocalizationProvider>
    <Provider store={store}>
      <Router>
        {children}
      </Router>
    </Provider>
  </LocalizationProvider>
);

export default AppProvider;
