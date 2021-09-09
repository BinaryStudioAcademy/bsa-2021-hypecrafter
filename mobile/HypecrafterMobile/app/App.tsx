import React from 'react';
import { Provider } from 'react-redux';
import Main from './components/Main';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
