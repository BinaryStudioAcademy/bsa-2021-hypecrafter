import { useEffect } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { Routes, StorageKeys } from '../../common/enums';
import { useAction, useTypedSelector } from '../../hooks';
import FundsPage from '../../scenes/Wallet/FundsPage';
import Header from '../Header';
import LoaderWrapper from '../LoaderWrapper';
import LoginPage from '../LoginPage';
import Main from '../Main';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import SignupPage from '../SignupPage';

const routesWitoutHeader = [Routes.LOGIN, Routes.SIGNUP];

const Routing = () => {
  const { authFetchUserAction } = useAction();
  const authStore = useTypedSelector(({ auth: { user, isLoading } }) => ({
    user,
    isLoading
  }));
  const { pathname } = useLocation();

  const { user, isLoading } = authStore;
  const hasToken = Boolean(localStorage.getItem(StorageKeys.ACCESS_TOKEN));

  useEffect(() => {
    if (hasToken) {
      authFetchUserAction();
    }
  }, [authFetchUserAction]);

  return (
    <LoaderWrapper isLoading={isLoading || (!user && hasToken)}>
      {!routesWitoutHeader.includes(pathname as Routes) && <Header />}
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
        <PublicRoute
          restricted={false}
          path={Routes.SIGNUP}
          exact
          component={SignupPage}
        />
        <PrivateRoute exact path={Routes.ADDFUNDS} component={FundsPage} />
      </Switch>
    </LoaderWrapper>
  );
};

export default Routing;
