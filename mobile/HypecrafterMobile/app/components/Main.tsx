import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Routes } from '../common/enums';
import { StorageKeys } from '../common/enums/storage-keys';
import { useAction } from '../hooks';
import NavigationService from '../navigation';
import { MainNavigator } from '../routes';
import Storage from '../storage';

const Main = () => {
  const { authFetchUserAction } = useAction();

  useEffect(() => {
    Storage.get(StorageKeys.ACCESS_TOKEN).then(token => {
      authFetchUserAction();
      if (token) {
        NavigationService.navigate(Routes.APP);
      } else {
        NavigationService.navigate(Routes.AUTH);
      }
    });
  });
  return (
    <NavigationContainer>
      <MainNavigator
        ref={(navigatorRef: any) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </NavigationContainer>
  );
};

export default Main;
