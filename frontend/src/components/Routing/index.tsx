import { useEffect } from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import { Routes } from '../../common/enums';
import { getAccessToken } from '../../helpers/localStorage';
import { useAction, useTypedSelector } from '../../hooks';
import LoginPage from '../../scenes/Auth/LoginPage';
import SignupPage from '../../scenes/Auth/SignupPage';
import MainPage from '../../scenes/MainPage';
import TrendsPage from '../../scenes/TrendsPage';
import FundsPage from '../../scenes/Wallet/FundsPage';
import Transactions from '../../scenes/Wallet/Transactions';
import Header from '../Header';
import LoaderWrapper from '../LoaderWrapper';
import PageNotFound from '../PageNotFound';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

const routesWitoutHeader = [Routes.LOGIN, Routes.SIGNUP];

const Routing = () => {
  const { authFetchUserAction } = useAction();
  const authStore = useTypedSelector(({ auth: { user, isLoading } }) => ({
    user,
    isLoading
  }));
  const { pathname } = useLocation();
  const { user, isLoading } = authStore;
  const hasToken = Boolean(getAccessToken());

  useEffect(() => {
    if (hasToken) {
      authFetchUserAction();
    }
  }, [authFetchUserAction]);

  return (
    <LoaderWrapper isLoading={isLoading || (!user && hasToken)} variant='page'>
      {!routesWitoutHeader.includes(pathname as Routes) && <Header />}
      <Switch>
        <PublicRoute
          restricted={false}
          path={Routes.HOME}
          exact
          component={MainPage}
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
        <PrivateRoute exact path={Routes.TRANSACTIONS} component={Transactions} />
        <PublicRoute
          restricted={false}
          path="/trends"
          exact
          component={TrendsPage}
        />
        <PublicRoute
          restricted={false}
          path={Routes.NOTFOUND}
          exact
          component={PageNotFound}
        />
        <Redirect from="*" to={Routes.NOTFOUND} />
      </Switch>
    </LoaderWrapper>
  );
};

export default Routing;
