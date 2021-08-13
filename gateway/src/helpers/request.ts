import { Request, Response, NextFunction } from 'express';

export const wrap = <
    P extends ParamsDictionary,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = Query
  >(
    handler: (
      req?: Request<P, ResBody, ReqBody, ReqQuery>
    ) => Promise<{ result?: ResBody; statusCode?: number }>
  ) => (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) => handler(req)
    .then(({ result, statusCode = 200 }) => {
      if (result) {
        res.json(result);
      } else {
        res.send(statusCode);
      }
    })
    .catch(next);
