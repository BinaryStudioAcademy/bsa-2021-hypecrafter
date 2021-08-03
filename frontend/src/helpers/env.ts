type ProcessEnvKey =
  | 'NODE_ENV'
  | 'REACT_APP_SERVER_URL'
  | 'SENTRY_DSN'

export const getEnv = (key: ProcessEnvKey) => process.env[key];
