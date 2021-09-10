declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;
  }
}

declare interface ParamsDictionary {
  [key: string]: string;
}

declare interface Query { [key: string]: undefined | string | string[] | Query | Query[] }

declare module 'node-fetch';
