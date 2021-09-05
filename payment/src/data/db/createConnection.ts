import mongoose from 'mongoose';
import { env } from '../../env';
import { log } from '../../helpers';

const { mongoDB } = env.app;

export async function createConnection() {
  try {
    await mongoose.connect(mongoDB.url);
  } catch (e) {
    log(e);
  }
}
