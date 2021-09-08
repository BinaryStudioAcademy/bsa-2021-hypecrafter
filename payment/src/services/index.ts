import { PaymentRepository } from '../data/repositories';
import PaymentService from './payment';

export function initServices() {
  return {
    paymentService: new PaymentService(new PaymentRepository())
  };
}

export interface Services {
  paymentService: PaymentService
}
