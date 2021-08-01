import { getCustomRepository } from 'typeorm';
import { TransactionRepository } from '../data/repositories';
import PaymentService from './payment';

export function initServices() {
  return {
    paymentService: new PaymentService(getCustomRepository(TransactionRepository))
  };
}

export interface Services {
  paymentService: PaymentService
}
