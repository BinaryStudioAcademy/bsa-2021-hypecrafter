import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '../../common/enums';
import Main from '../Main';
import { useTypedSelector } from '../../hooks';
import { authAction } from '../../actions/auth';

const Routing = () => {
  const dispatch = useDispatch();
  const authUser = () => dispatch(authAction());
  const authStore = useTypedSelector(({ auth: { user, isLoading, error } }) => ({
    user,
    isLoading,
    error
  }));
  const { user, isLoading, error } = authStore;
  console.log('auth', user, isLoading, error);

  useEffect(() => {
    localStorage.setItem('ACCESS_TOKEN', 'token');
    authUser();
  }, []);

  return (
    <Switch>
      <Route path={Routes.HOME} exact component={Main} />
    </Switch>
  );
};

export default Routing;
