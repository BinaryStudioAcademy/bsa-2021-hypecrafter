declare module 'micromq' {
    class MicroMq {
      constructor(any);

        get: any;

        post: any;

        put: any;

        patch: any;

        delete: any;

        start(): void;
    }
    export default MicroMq;
}
declare module 'micromq/gateway';

declare namespace Express {
    export interface Response {
        delegate: any;
    }
}
