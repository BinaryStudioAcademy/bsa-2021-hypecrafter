import { RequestHandler } from "express";
import { jwt as jwtMiddleware } from "./jwt";

const authorization =
  (routesWhiteList: Array<string> = []): RequestHandler =>
  (req, res, next) => {
    return routesWhiteList.some((route) => route === req.path)
      ? next()
      : jwtMiddleware(req, res, next);
  }

export { authorization };
