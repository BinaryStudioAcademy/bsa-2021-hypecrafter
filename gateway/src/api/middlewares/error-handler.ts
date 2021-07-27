import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from 'hypecrafter-shared/http-status-code';
import { log } from '../../helpers';

export const handleError = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  log(error);

  res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
};
