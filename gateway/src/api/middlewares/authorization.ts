import { NextFunction, Request, Response } from 'express';
import { jwt as jwtMiddleware } from './jwt';

const authorization =
  (routesBlackList: string[] = []): RequestHandler =>
  (req, res, next) => {
    function checkRouteList(route: string) {
      if (route.includes('/:id')) return validateUuid(route, req.path);
      return route === req.path;
    }

    const blackRoute = routesBlackList.some(checkRouteList);
    if (blackRoute) return jwtMiddleware(req, res, next);

    return next();
  };

export { authorization };
