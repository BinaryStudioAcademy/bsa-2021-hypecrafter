import { Request, Response } from 'express';

export const saveReqBodyUserEmail = (req: Request, _: Response, next: Next) => {
  req.body = { ...req.user };
  next();
};
