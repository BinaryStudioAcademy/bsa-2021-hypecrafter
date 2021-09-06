import { NavigationActions, NavigationContainerComponent } from 'react-navigation';

let navigator: NavigationContainerComponent | null;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent | null) {
  navigator = navigatorRef;
}

function navigate(routeName: string, params?: any) {
  if (navigator) {
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }
}

export default {
  navigate,
  setTopLevelNavigator,
};
