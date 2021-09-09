import { createStackNavigator } from 'react-navigation-stack';
import MainView from '../../components/MainView/MainView';
import ProjectView from '../../components/ProjectView/ProjectView';

const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: MainView,
      navigationOptions: {
        headerShown: false,
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
