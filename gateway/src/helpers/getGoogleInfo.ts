import { OAuth2Client } from 'google-auth-library';
import { env } from '../env';
import { CustomError } from './customError';

const client = new OAuth2Client(
  env.auth.googleClientId
);

export const getGoogleInfo = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: env.auth.googleClientId
    });

    const {
      given_name: firstName,
      family_name: lastName,
      locale: region,
      email,
      sub: googleId,
    } = ticket.getPayload();

    return {
      firstName,
      lastName,
      region,
      email,
      googleId
    };
  } catch {
    throw new CustomError(403, 'Invalid credentials');
  }
};
