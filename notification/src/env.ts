import * as dotenv from 'dotenv';
import { getEnv } from './helpers';

dotenv.config();

export const env = {
  app: {
    port: getEnv('PORT') || 3001,
    environment: getEnv('NODE_ENV'),
    rabbit: {
      url: getEnv('RABBIT_URL') || 'amqp://localhost'
    }
  }
};
