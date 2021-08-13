import { useEffect } from 'react';
import { Switch, useLocation, Redirect } from 'react-router-dom';
import { Routes, StorageKeys } from '../../common/enums';
import { useAction, useTypedSelector } from '../../hooks';
import MainPage from '../../scenes/MainPage';
import TrendsPage from '../../scenes/TrendsPage';
import Header from '../Header';
import LoaderWrapper from '../LoaderWrapper';
import LoginPage from '../LoginPage';
import PrivateRoute from '../PrivateRoute';
import FundsPage from '../../scenes/Wallet/FundsPage';
import CreateProject from '../../scenes/CreateProject';
import PageNotFound from '../PageNotFound';
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
        <PublicRoute restricted={false} exact path={Routes.PROJECTS_CREATE} component={CreateProject} />
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
