/* eslint-disable */
declare module "micromq";
declare module "micromq/gateway";

declare namespace Express {
    export interface Response {
        delegate
    }
}