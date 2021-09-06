type ProcessEnvKey =
  | 'NODE_ENV'
  | 'PORT'
  | 'RABBIT_URL'
  | 'SECRET_KEY'
  | 'FACEBOOK_APP_ID'
  | 'FACEBOOK_APP_SECRET'
  | 'GOOGLE_CLIENT_ID'
  | 'ORIGIN';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
