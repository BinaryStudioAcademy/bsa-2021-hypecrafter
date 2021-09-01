import { createStackNavigator } from 'react-navigation-stack';
import LoginView from '../../components/LoginView/LoginView';

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginView,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default AuthNavigator;
