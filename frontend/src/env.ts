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
    dsn: getEnv('REACT_APP_SENTRY_DSN')
  },
  aws: {
    bucketName: getEnv('REACT_APP_AWS_BUCKET_NAME'),
    region: getEnv('REACT_APP_AWS_REGION'),
    accessKeyId: getEnv('REACT_APP_AWS_ACCESS_KEY_ID'),
    secretAccessKey: getEnv('REACT_APP_AWS_SECRET_ACCESS_KEY')
  },
  search: {
    url: getEnv('REACT_APP_SEARCH_URL'),
    urlDocuments: getEnv('REACT_APP_SEARCH_URL_DOCUMENTS'),
    searchKey: getEnv('REACT_APP_SEARCH_KEY'),
    privateKey: getEnv('REACT_APP_PRIVATE_KEY')
  },
  payment: {
    key: getEnv('REACT_APP_PAYMENT_KEY')
  },
  auth: {
    facebookClientId: getEnv('REACT_APP_FACEBOOK_CLIENT_ID'),
    googleClientId: getEnv('REACT_APP_GOOGLE_CLIENT_ID')
  }
};
