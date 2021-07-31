type ProcessEnvKey =
  | 'NODE_ENV'
  | 'PORT'
  | 'RABBIT_URL'

export const getEnv = (key: ProcessEnvKey) => process.env[key];
