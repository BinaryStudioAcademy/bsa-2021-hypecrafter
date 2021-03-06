type ProcessEnvKey =
  | 'NODE_ENV'
  | 'PORT'
  | 'MONGODB_URL'
  | 'RABBIT_URL'
  | 'PAYMENT_PRIVATE_KEY'
  | 'PAYMENT_WEBHOOK_KEY';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
