import { RequestHandler } from 'express';
import { validateUuid } from '../../helpers/uuid';
import { jwt as jwtMiddleware } from './jwt';

const authorization = (routesWhiteList: Array<string> = []): RequestHandler => (
  (req, res, next) => (routesWhiteList.some(route => {
    if (route.includes('/:id')) {
      return validateUuid(route, req.path);
    }
    return route === req.path;
  })
    ? next()
    : jwtMiddleware(req, res, next)));

export { authorization };
