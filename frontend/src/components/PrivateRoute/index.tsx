import React, { FC, ElementType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useTypedSelector } from '../../hooks';
import { Routes } from '../../common/enums';

type PrivateRouteProps = {
  component: ElementType
} & RouteProps;

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: ComponentRender,
  ...rest
}) => {
  const { user: currentUser } = useTypedSelector(({ auth: { user } }) => ({
    user
  }));

  const hasUser = Boolean(currentUser);

  const render = (props: any): JSX.Element => (hasUser ? (
    <ComponentRender {...props} />
  ) : (
    <Redirect to={Routes.LOGIN} />
  ));

  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
