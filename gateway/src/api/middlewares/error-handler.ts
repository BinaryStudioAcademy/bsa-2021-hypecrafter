import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from 'hypecrafter-shared/enums/http-status-code';
import { log } from '../../helpers';
class CustomError extends Error {
  constructor(type: string, message: string) {
    super(message);
    this.name = type;
  }
}

export const handleError = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { result } = _req.body;

  log(error);

  if (!result) throw new CustomError(error.name, error.message);

  res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
};
