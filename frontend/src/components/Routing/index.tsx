import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes, StorageKeys } from '../../common/enums';
import LoginPage from '../LoginPage';
import Main from '../Main';
import { useTypedSelector } from '../../hooks';
import { authFetchUserAction } from '../../actions/auth';
import FundsPage from '../../scenes/Wallet/FundsPage';

const Routing = () => {
  const dispatch = useDispatch();
  const authUser = () => dispatch(authFetchUserAction());
  const authStore = useTypedSelector(({ auth: { user, isLoading } }) => ({
    user,
    isLoading
  }));
  const { user, isLoading } = authStore;
  console.log('auth', user, isLoading);

  useEffect(() => {
    const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    if (token) {
      authUser();
    }
  }, []);

  return (
    <Switch>
      <Route path={Routes.HOME} exact component={Main} />
      <Route path={Routes.ADDFUNDS} exact component={FundsPage} />
      <Route path={Routes.LOGIN} exact component={LoginPage} />
      <Redirect to={Routes.ADDFUNDS} />
    </Switch>
  );
};
//      <Route path={Routes.HOME} exact component={Main} />
export default Routing;
