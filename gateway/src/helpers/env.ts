type ProcessEnvKey =
  | 'NODE_ENV'
  | 'PORT'
  | 'RABBIT_URL'
  | 'SECRET_KEY'
  | 'GOOGLE_CLIENT_ID';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
