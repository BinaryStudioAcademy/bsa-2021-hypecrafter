import { HttpStatusCode } from '../../../shared/build/enums';

export class CustomError extends Error {
  status: number;

  constructor(type: number, message: string) {
    super(message);
    this.status = type;
    this.name = HttpStatusCode[type];
  }
}
