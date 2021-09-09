type ProcessEnvKey = 'NODE_ENV'
| 'PORT'
| 'RABBIT_URL'
| 'SEARCH_DOCUMENTS_URL'
| 'SEARCH_PRIVATE_KEY'
| 'PAYMENT_PRIVATE_KEY'
| 'PAYMENT_WEBHOOK_KEY';

export const getEnv = (key: ProcessEnvKey) => process.env[key];
