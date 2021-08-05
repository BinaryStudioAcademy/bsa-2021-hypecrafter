import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { authFetchUserAction } from '../../actions/auth';
import { Routes, StorageKeys } from '../../common/enums';
import { useTypedSelector } from '../../hooks';
import FundsPage from '../../scenes/Wallet/FundsPage';
import LoginPage from '../LoginPage';
import Main from '../Main';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

const Routing = () => {
  const dispatch = useDispatch();
  const authUser = () => dispatch(authFetchUserAction());
  const authStore = useTypedSelector(({ auth: { user, isLoading } }) => ({
    user,
    isLoading
  }));
  const { user, isLoading } = authStore;
  const hasToken = !!localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  useEffect(() => {
    if (hasToken && !isLoading) {
      authUser();
    }
  }, []);
  return isLoading || (!user && hasToken) ? (
    <p>Loading...</p>
  ) : (
    <Switch>
      <PublicRoute
        restricted={false}
        path={Routes.HOME}
        exact
        component={Main}
      />
      <PublicRoute
        restricted={false}
        path={Routes.LOGIN}
        exact
        component={LoginPage}
      />
      <PrivateRoute exact path={Routes.ADDFUNDS} component={FundsPage} />
    </Switch>
  );
};

export default Routing;
