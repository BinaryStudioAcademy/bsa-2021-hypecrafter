import * as dotenv from 'dotenv';
import { getEnv } from './helpers';

dotenv.config();

export const env = {
  app: {
    port: getEnv('PORT') || 3001,
    environment: getEnv('NODE_ENV'),
    rabbit: {
      url: getEnv('RABBIT_URL') || 'amqp://localhost'
    },
    search: {
      urlDocuments: getEnv('SEARCH_DOCUMENTS_URL'),
      privateKey: getEnv('SEARCH_PRIVATE_KEY')
    },
    payment:
    {
      private_key: getEnv('PAYMENT_PRIVATE_KEY'),
      webhook_key: getEnv('PAYMENT_WEBHOOK_KEY')
    }
  }
};
