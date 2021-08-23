/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'micromq' {
  import { IRouterMatcher } from 'express';

  class MicroMq {
    constructor(options: {
      name?: string;
      rabbit?: { url: string };
      microservices?: string[];
    });

    get: IRouterMatcher<any>;

    post: IRouterMatcher<any>;

    put: IRouterMatcher<any>;

    patch: IRouterMatcher<any>;

    delete: IRouterMatcher<any>;

    start(): void;
  }
  export default MicroMq;
}

declare module 'micromq/gateway';

declare namespace Express {
  export interface Response {
    delegate(name: string): any;
  }
  export interface Request {
    user: {
      userId?: string;
    }
  }
}

declare type Empty = Record<string, never>;

declare interface ParamsDictionary {
  [key: string]: string;
}

declare interface Query {
  [key: string]: undefined | string | string[] | Query | Query[];
}
