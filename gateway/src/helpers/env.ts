type ProcessEnvKey =
  | 'NODE_ENV'
  | 'PORT'
  | 'RABBIT_URL'
  | 'SECRET_KEY'
  | 'FACEBOOK_APP_ID'
  | 'FACEBOOK_APP_SECRET';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
