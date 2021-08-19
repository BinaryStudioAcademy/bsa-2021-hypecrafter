import { NextFunction, Request, Response } from 'express';
import { isRouteInWhiteList } from '../../helpers/whiteList';

export const setUserInfo = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!isRouteInWhiteList(req.path)) {
    const { userId } = req.user as any;
    req.headers.userId = userId;
  }
  next();
};
