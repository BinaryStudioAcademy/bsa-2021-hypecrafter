import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Routes, StorageKeys } from '../../common/enums';
import LoginPage from '../LoginPage';
import MainPage from '../../scenes/MainPage';
import { useTypedSelector } from '../../hooks';
import { authFetchUserAction } from '../../actions/auth';
import Header from '../Header';
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
    <div>
      <Header />
      <Switch>
        <PublicRoute restricted={false} path={Routes.HOME} exact component={MainPage} />
        <PublicRoute restricted={false} path={Routes.LOGIN} exact component={LoginPage} />
      </Switch>
    </div>
  );
};

export default Routing;
