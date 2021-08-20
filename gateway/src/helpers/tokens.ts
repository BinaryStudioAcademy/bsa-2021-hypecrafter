import jwt from 'jsonwebtoken';
import { env } from '../env';

const createToken = (userId: string) => jwt.sign({ userId }, env.jwt.secret, { expiresIn: env.jwt.expiresIn });

export { createToken };
