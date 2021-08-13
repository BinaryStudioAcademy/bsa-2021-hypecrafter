import { ElementType, FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Routes } from '../../common/enums';
import { useTypedSelector } from '../../hooks';

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
