import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MainView from '../../components/MainView/MainView';
import ProjectView from '../../components/ProjectView/ProjectView';
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
    },
    Project: {
      screen: ProjectView,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Main',
  },
);

export default AppNavigator;
