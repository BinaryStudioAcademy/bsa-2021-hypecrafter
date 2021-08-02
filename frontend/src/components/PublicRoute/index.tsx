import React, { FC, ElementType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useTypedSelector } from '../../hooks';
import { Routes } from '../../common/enums';

type PublicRouteProps = {
  restricted: boolean,
  component: ElementType
} & RouteProps;

const PublicRoute: FC<PublicRouteProps> = ({
  component: ComponentRender,
  restricted,
  ...rest
}) => {
  const { user: currentUser } = useTypedSelector(({ auth: { user } }) => ({
    user
  }));

  const hasUser = Boolean(currentUser);

  const render = (props: any): JSX.Element => ((hasUser && restricted) ? (
    <Redirect to={Routes.HOME} />
  ) : (
    <ComponentRender {...props} />
  ));

  return <Route {...rest} render={render} />;
};

export default PublicRoute;
