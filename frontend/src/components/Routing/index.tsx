import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import { Routes, StorageKeys } from '../../common/enums';
import LoginPage from '../LoginPage';
import MainPage from '../../scenes/MainPage';
import { useTypedSelector } from '../../hooks';
import { authFetchUserAction } from '../../actions/auth';
import Header from '../Header';
import PublicRoute from '../PublicRoute';
import LoaderWrapper from '../LoaderWrapper';
import PrivateRoute from '../PrivateRoute';
import FundsPage from '../../scenes/Wallet/FundsPage';

const Routing = () => {
  const dispatch = useDispatch();
  const authUser = () => dispatch(authFetchUserAction());
  const authStore = useTypedSelector(({ auth: { user, isLoading } }) => ({
    user,
    isLoading
  }));
  const { location: { pathname } } = useHistory();

  const routesWitoutHeader = [Routes.LOGIN];
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
          component={MainPage}
        />
        <PublicRoute
          restricted={false}
          path={Routes.LOGIN}
          exact
          component={LoginPage}
        />
        <PrivateRoute exact path={Routes.ADDFUNDS} component={FundsPage} />
      </Switch>
    </LoaderWrapper>
  );
};

export default Routing;
