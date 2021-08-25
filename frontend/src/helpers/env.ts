type ProcessEnvKey =
  | 'NODE_ENV'
  | 'REACT_APP_SERVER_URL'
  | 'SENTRY_DSN'
  | 'AWS_BUCKET_NAME'
  | 'AWS_REGION'
  | 'AWS_ACCESS_KEY_ID'
  | 'AWS_SECRET_ACCESS_KEY';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
