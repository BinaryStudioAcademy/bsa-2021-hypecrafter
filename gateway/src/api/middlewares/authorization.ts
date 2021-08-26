import { RequestHandler } from 'express';
import { validatePage } from '../../helpers/page';
import { validateUuid } from '../../helpers/uuid';
import { jwt as jwtMiddleware } from './jwt';

const authorization = (routesBlackList: string[] = []): RequestHandler => (req, res, next) => {
  function checkRouteList(route: string) {
    if (route.includes('/:id')) return validateUuid(route, req.path);
    if (route.includes('/:page')) return validatePage(route, req.path);
    return route === req.path;
  }

  const blackRoute = routesBlackList.some(checkRouteList);
  if (blackRoute) return jwtMiddleware(req, res, next);

  return next();
};

export { authorization };
