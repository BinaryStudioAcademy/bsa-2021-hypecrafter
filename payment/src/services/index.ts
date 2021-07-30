import { getCustomRepository } from 'typeorm';
import { DonateRepository } from '../data/repositories/donate';
import PaymentService from './payment';

export function initServices() {
  return {
    paymentService: new PaymentService(getCustomRepository(DonateRepository))
  };
}

export interface Services {
  paymentService: PaymentService
}
