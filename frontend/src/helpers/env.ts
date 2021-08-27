type ProcessEnvKey =
  | 'NODE_ENV'
  | 'REACT_APP_SERVER_URL'
  | 'SENTRY_DSN'
  | 'REACT_APP_GOOGLE_CLIENT_ID';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
