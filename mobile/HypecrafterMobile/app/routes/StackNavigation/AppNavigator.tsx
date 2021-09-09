import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MainView from '../../components/MainView/MainView';
import UserView from '../../components/UserView/UserView';
import ProjectView from '../../components/ProjectView/ProjectView';
import Header from '../../components/common/Header'
import commonStyles from '../../styles/common';

const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: MainView,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: {
            backgroundColor: commonStyles.color.grey,
          },
          headerTitle: () => <Header navigation={navigation} />
        }
      }
    },
    User: {
      screen: UserView,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: {
            backgroundColor: commonStyles.color.grey,
          },
          headerTintColor: commonStyles.color.text,
          headerTitle: () => <Header navigation={navigation} />
        }
      }
    },
  },
  {
    initialRouteName: 'Main',
  },
);

export default AppNavigator;
