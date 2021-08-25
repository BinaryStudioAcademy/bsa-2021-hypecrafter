import * as dotenv from 'dotenv';
import { getEnv } from './helpers';

dotenv.config();

export const env = {
  app: {
    environment: getEnv('NODE_ENV')
  },
  server: {
    url: getEnv('REACT_APP_SERVER_URL') || 'http://hypecrafter2-env.eba-n3gbu5mb.us-west-2.elasticbeanstalk.com/api'
  },
  sentry: {
    dsn: getEnv('SENTRY_DSN')
  },
  payment: {
    key: getEnv('REACT_APP_PAYMENT_KEY')
  }
};
