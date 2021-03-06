import * as dotenv from 'dotenv';
import { getEnv } from './helpers';

dotenv.config();

export const env = {
  app: {
    origin: getEnv('ORIGIN'),
    port: getEnv('PORT') || 3001,
    socketPort: getEnv('SOCKET_PORT'),
    environment: getEnv('NODE_ENV'),
    rabbit: {
      url: getEnv('RABBIT_URL') || 'amqp://localhost'
    }
  },
  jwt: {
    secret: getEnv('SECRET_KEY'),
    expiresIn: '24h'
  },
  auth: {
    facebook: {
      appId: getEnv('FACEBOOK_APP_ID'),
      secret: getEnv('FACEBOOK_APP_SECRET')
    },
    googleClientId: getEnv('GOOGLE_CLIENT_ID')
  }
};
