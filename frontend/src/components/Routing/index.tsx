import { Route, Switch } from 'react-router-dom';
import { Routes } from '../../common/enums';
import Main from '../Main';

const Routing = () => (
  <Switch>
    <Route path={Routes.HOME} exact component={Main} />
  </Switch>
);

export default Routing;
