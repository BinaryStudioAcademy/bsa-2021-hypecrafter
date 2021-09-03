import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Routes } from './common/enums';
import { StorageKeys } from './common/enums/storage-keys';
import NavigationService from './navigation';
import { MainNavigator } from './routes';
import Storage from './storage';
import { store } from './store';

const App = () => {
  useEffect(() => {
    Storage.get(StorageKeys.ACCESS_TOKEN).then(token => {
      if (token) {
        NavigationService.navigate(Routes.APP);
      } else {
        NavigationService.navigate(Routes.AUTH);
      }
    });
  });
  return (
    <Provider store={store}>
      <MainNavigator
        ref={(navigatorRef: any) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
};

export default App;
