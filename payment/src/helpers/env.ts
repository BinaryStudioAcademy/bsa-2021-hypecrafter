type ProcessEnvKey =
  | 'NODE_ENV'
  | 'PORT'
  | 'MONGODB_URL'
  | 'RABBIT_URL';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
