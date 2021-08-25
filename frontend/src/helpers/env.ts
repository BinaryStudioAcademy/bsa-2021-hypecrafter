type ProcessEnvKey =
  | 'NODE_ENV'
  | 'REACT_APP_SERVER_URL'
  | 'SENTRY_DSN'
  | 'REACT_APP_PAYMENT_KEY';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
