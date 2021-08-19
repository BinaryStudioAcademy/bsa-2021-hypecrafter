import { RequestHandler } from 'express';
import { validateUuid } from '../../helpers/uuid';
import invalidRoute from './invalid-route';
import { jwt as jwtMiddleware } from './jwt';

const authorization =
  (
    routesWhiteList: string[] = [],
    routesBlackList: string[] = []
  ): RequestHandler =>
  (req, res, next) => {
    function checkRouteList(route: string) {
      if (route.includes('/:id')) return validateUuid(route, req.path);
      return route === req.path;
    }

    console.log(req.body);
    const whiteRoute = routesWhiteList.some(checkRouteList);
    const blackRoute = routesBlackList.some(checkRouteList);

    if (whiteRoute) return next();
    if (blackRoute) return jwtMiddleware(req, res, next);
    return invalidRoute(res);
  };

export { authorization };
