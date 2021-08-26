type ProcessEnvKey =
  | 'NODE_ENV'
  | 'REACT_APP_SERVER_URL'
  | 'SENTRY_DSN'
  | 'REACT_APP_AWS_BUCKET_NAME'
  | 'REACT_APP_AWS_REGION'
  | 'REACT_APP_AWS_ACCESS_KEY_ID'
  | 'REACT_APP_AWS_SECRET_ACCESS_KEY';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
