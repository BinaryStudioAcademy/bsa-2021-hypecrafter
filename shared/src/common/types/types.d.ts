declare module 'micromq' {
    class MicroMq {
      constructor(any);

        use: any;

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
