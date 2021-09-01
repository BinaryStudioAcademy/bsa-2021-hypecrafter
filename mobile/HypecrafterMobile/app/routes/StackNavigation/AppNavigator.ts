import { createStackNavigator } from 'react-navigation-stack';
import MainView from '../../components/MainView/MainView';

const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: MainView,
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
