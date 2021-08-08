import { env } from './../env';
import jwt from "jsonwebtoken";

const createToken = (userId: string) =>
  jwt.sign({ userId }, env.jwt.secret, { expiresIn: env.jwt.expiresIn });

export { createToken };
