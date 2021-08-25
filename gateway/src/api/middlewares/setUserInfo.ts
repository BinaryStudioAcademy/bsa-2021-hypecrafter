import { NextFunction, Request, Response } from 'express';
import { isRouteInBlackList } from '../../helpers/blackList';

export const setUserInfo = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!isRouteInBlackList(req.path)) {
    const { userId } = req.user;
    req.headers.userId = userId;
  }
  next();
};
