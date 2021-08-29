import { Request, Response } from 'express';

export const saveReqBodyUserId = (req: Request, _: Response, next: Next) => {
  req.body = { ...req.user };
  next();
};
