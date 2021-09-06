import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StorageKey } from './common/constants';
import { Routes } from './common/enums';
import NavigationService from './navigation';
import { MainNavigator } from './routes';
import Storage from './storage';
import { store } from './store';

const App = () => {
  useEffect(() => {
    Storage.get(StorageKey).then(token => {
      if (token) {
        NavigationService.navigate(Routes.APP);
      } else {
        NavigationService.navigate(Routes.AUTH);
      }
    });
  });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator
          ref={(navigatorRef: any) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
