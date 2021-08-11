import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { authFetchUserAction } from '../../actions/auth';
import { Routes, StorageKeys } from '../../common/enums';
import { useTypedSelector } from '../../hooks';
import FundsPage from '../../scenes/Wallet/FundsPage';
import Header from '../Header';
import LoaderWrapper from '../LoaderWrapper';
import LoginPage from '../LoginPage';
import Main from '../Main';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import SignupPage from '../SignupPage';

const Routing = () => {
  const dispatch = useDispatch();
  const authUser = () => dispatch(authFetchUserAction());
  const authStore = useTypedSelector(({ auth: { user, isLoading } }) => ({
    user,
    isLoading
  }));
  const { location: { pathname } } = useHistory();

  const routesWitoutHeader = [Routes.LOGIN, Routes.SIGNUP];
  const { user, isLoading } = authStore;
  const hasToken = Boolean(localStorage.getItem(StorageKeys.ACCESS_TOKEN));

  useEffect(() => {
    if (hasToken) {
      authUser();
    }
  }, []);

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
