import { RequestHandler } from 'express';
import { jwt as jwtMiddleware } from './jwt';
import { validateUuid } from '../../helpers/uuid';

const authorization = (routesWhiteList: Array<string> = []): RequestHandler => (
  (req, res, next) => (routesWhiteList.some(route => {
    if (route.includes('/:id')) validateUuid(route, req.path);
    return route === req.path;
  })
    ? next()
    : jwtMiddleware(req, res, next)));

export { authorization };
