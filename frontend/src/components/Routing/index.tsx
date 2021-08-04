import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { authFetchUserAction } from '../../actions/auth';
import { Routes, StorageKeys } from '../../common/enums';
import { useTypedSelector } from '../../hooks';
import LoginPage from '../LoginPage';
import Main from '../Main';
import PublicRoute from '../PublicRoute';

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
      <PublicRoute restricted={false} path={Routes.HOME} exact component={Main} />
      <PublicRoute restricted={false} path={Routes.LOGIN} exact component={LoginPage} />
    </Switch>
  );
};

export default Routing;
