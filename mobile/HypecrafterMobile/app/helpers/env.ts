type ProcessEnvKey =
  | 'REACT_APP_SERVER_URL';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
