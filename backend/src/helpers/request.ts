import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../common/enums';

export const wrap = <P extends ParamsDictionary, ResBody = unknown, ReqBody = unknown, ReqQuery = Query>(
  handler: (req?: Request<P, ResBody, ReqBody, ReqQuery>) => Promise<ResBody>
) => (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) => handler(req).then(result => (result ? res.send(result) : res.sendStatus(HttpStatusCode.NO_CONTENT))).catch(next);
