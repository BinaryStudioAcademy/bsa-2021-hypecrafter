import { NextFunction, Request, Response } from 'express';

export const wrap = <P extends any, ResBody = unknown, ReqBody = unknown, ReqQuery = any>(
  handler: (req?: Request<P, ResBody, ReqBody, ReqQuery>) => Promise<ResBody>
) => (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) => handler(req).then(result => res.json(result)).catch(next);
