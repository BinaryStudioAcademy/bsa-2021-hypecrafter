import { NextFunction, Request, Response } from 'express';
import { log } from '../../helpers';
import { CustomError } from '../../helpers/customError';

export const handleError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const {status, message} = error;
  
  log(error);
  res.sendStatus(status).send(message);
};
