type ProcessEnvKey =
  | 'NODE_ENV'
  | 'REACT_APP_SERVER_URL'
  | 'REACT_APP_AWS_BUCKET_NAME'
  | 'REACT_APP_AWS_REGION'
  | 'REACT_APP_AWS_ACCESS_KEY_ID'
  | 'REACT_APP_AWS_SECRET_ACCESS_KEY'
  | 'REACT_APP_SENTRY_DSN'
  | 'REACT_APP_GOOGLE_CLIENT_ID';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
