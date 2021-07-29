import { paymentRepository } from '../../data/repositories';
import PaymentService from './payment';

const paymentService = new PaymentService(
  paymentRepository
);

export default paymentService;
