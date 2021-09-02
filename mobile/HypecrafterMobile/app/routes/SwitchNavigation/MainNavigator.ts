import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import AuthNavigator from '../StackNavigation/AuthNavigator';
import AppNavigator from '../StackNavigation/AppNavigator';

const MainNavigator = createSwitchNavigator({
  App: AppNavigator,
  Auth: AuthNavigator,
});

export default createAppContainer(MainNavigator);
