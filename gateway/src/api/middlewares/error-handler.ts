import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from 'hypecrafter-shared/enums/http-status-code';
import { log } from '../../helpers';
import { CustomError } from '../../helpers/customError';

export const handleError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const {name, message} = error;
  const status: number = HttpStatusCode[name];
  
  log(error);
  res.sendStatus(status).send(message);
};
