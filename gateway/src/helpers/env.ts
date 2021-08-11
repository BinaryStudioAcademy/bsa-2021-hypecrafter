type ProcessEnvKey =
  | 'NODE_ENV'
  | 'PORT'
  | 'RABBIT_URL'
  | 'SECRET_KEY';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
