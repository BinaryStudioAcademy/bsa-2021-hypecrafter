import { Route, Switch } from 'react-router-dom';
import { Routes } from '../../common/enums';
import AppProvider from '../../providers';
import Main from '../Main';

const App = () => (
  <AppProvider>
    <Switch>
      <Route path={Routes.HOME} exact component={Main} />
    </Switch>
  </AppProvider>
);

export default App;
