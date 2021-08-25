import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { log } from '../../helpers';
import { CustomError } from '../../helpers/customError';

export const handleError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { status, message } = error;
  
  log(error);

  if (status === 404)
    res.status(404).sendFile(path.resolve('src/common/errorPages/404.html'));
  else res.sendStatus(status).send(message);
};
