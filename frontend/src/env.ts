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
  aws: {
    bucketName: getEnv('AWS_BUCKET_NAME'),
    region: getEnv('AWS_REGION'),
    accessKeyId: getEnv('AWS_ACCESS_KEY_ID'),
    secretAccessKey: getEnv('AWS_SECRET_ACCESS_KEY')
  }
};
