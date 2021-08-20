import { NextFunction, Request, Response } from 'express';
import { isRouteInWhiteList } from '../../helpers/whiteList';
import { jwt as jwtMiddleware } from './jwt';

const authorization = (req: Request, res: Response, next: NextFunction) => ((isRouteInWhiteList(req.path))
  ? next()
  : jwtMiddleware(req, res, next));

export { authorization };
