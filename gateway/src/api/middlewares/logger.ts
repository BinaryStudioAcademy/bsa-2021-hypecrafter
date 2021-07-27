import { NextFunction, Request, Response } from 'express';
import { log } from '../../helpers';

export const logger = (req: Request, _: Response, next: NextFunction) => {
  log(`METHOD: ${req.method}, PATH: ${req.path}`);

  next();
};
