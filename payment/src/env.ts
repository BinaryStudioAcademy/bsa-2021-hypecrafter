import * as dotenv from 'dotenv';
import { getEnv } from './helpers';

dotenv.config();

export const env = {
  app: {
    port: getEnv('PORT') || 3003,
    environment: getEnv('NODE_ENV'),
    rabbit: {
      url: getEnv('RABBIT_URL') || 'amqp://localhost',
    },
    mongoDB: {
      url: getEnv('MONGODB_URL'),
    },
    payment: {
      private_key: getEnv('PAYMENT_PRIVATE_KEY'),
      webhook_key: getEnv('PAYMENT_WEBHOOK_KEY'),
    },
  },
};
