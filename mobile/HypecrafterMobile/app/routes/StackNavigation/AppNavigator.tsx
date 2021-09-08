import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MainView from '../../components/MainView/MainView';
import Header from '../../components/common/Header'
import commonStyles from '../../styles/common';

const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: MainView,
      navigationOptions: {
        headerStyle: {
          backgroundColor: commonStyles.color.grey,
        },
        headerTitle: () => <Header />
      },
    }
  },
  {
    initialRouteName: 'Main',
  },
);

export default AppNavigator;
