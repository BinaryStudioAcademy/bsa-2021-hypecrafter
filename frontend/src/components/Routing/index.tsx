import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Routes, StorageKeys } from '../../common/enums';
import Main from '../Main';
import { useTypedSelector } from '../../hooks';
import { authAction } from '../../actions/auth';

const Routing = () => {
  const dispatch = useDispatch();
  const authUser = () => dispatch(authAction());
  const authStore = useTypedSelector(({ auth: { user, isLoading } }) => ({
    user,
    isLoading
  }));
  const { user, isLoading } = authStore;
  console.log('auth', user, isLoading);

  useEffect(() => {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, 'token');
    const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    if (token) {
      authUser();
    }
  }, []);

  return (
    <Switch>
      <Route path={Routes.HOME} exact component={Main} />
    </Switch>
  );
};

export default Routing;
