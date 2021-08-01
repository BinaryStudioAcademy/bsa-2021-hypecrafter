import { Route, Switch } from 'react-router-dom';
import { Routes } from '../../common/enums';
import LoginPage from '../LoginPage';
import Main from '../Main';

const Routing = () => (
  <Switch>
    <Route path={Routes.HOME} exact component={Main} />
    <Route path={Routes.LOGIN} exact component={LoginPage} />
  </Switch>
);

export default Routing;
