import { HttpStatusCode } from '../../../shared/build/enums';

export class CustomError extends Error {
  name: keyof typeof HttpStatusCode;
  constructor(type: keyof typeof HttpStatusCode, message: string) {
    super(message);
    this.name = type;
  }
}
