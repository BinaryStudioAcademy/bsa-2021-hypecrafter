import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Routes, StorageKeys } from '../../common/enums';
import LoginPage from '../LoginPage';
import Main from '../Main';
import { useTypedSelector } from '../../hooks';
import { authFetchUserAction } from '../../actions/auth';
import Header from '../Header';
import PublicRoute from '../PublicRoute';
import LoaderWrapper from '../LoaderWrapper';

const Routing = () => {
  const dispatch = useDispatch();
  const authUser = () => dispatch(authFetchUserAction());
  const authStore = useTypedSelector(({ auth: { user, isLoading } }) => ({
    user,
    isLoading
  }));
  const { user, isLoading } = authStore;
  const hasToken = Boolean(localStorage.getItem(StorageKeys.ACCESS_TOKEN));

  useEffect(() => {
    if (hasToken) {
      authUser();
    }
  }, []);

  return (
    <LoaderWrapper isLoading={isLoading || (!user && hasToken)}>
      <Header />
      <Switch>
        <PublicRoute restricted={false} path={Routes.HOME} exact component={Main} />
        <PublicRoute restricted={false} path={Routes.LOGIN} exact component={LoginPage} />
      </Switch>
    </LoaderWrapper>
  );
};

export default Routing;
