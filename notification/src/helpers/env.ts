type ProcessEnvKey =
  | 'NODE_ENV'
  | 'PORT'
  | 'RABBIT_URL'
  | 'SERVER';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
