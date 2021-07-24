type ProcessEnvKey =
  | 'NODE_ENV'
  | 'REACT_APP_SERVER_URL'

export const getEnv = (key: ProcessEnvKey) => process.env[key];
