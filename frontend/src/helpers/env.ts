type ProcessEnvKey =
  | 'NODE_ENV'

export const getEnv = (key: ProcessEnvKey) => process.env[key];
