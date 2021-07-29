import { PaymentRepository } from '../../data/repositories';

export default class PaymentService {
  readonly #paymentRepository: PaymentRepository;

  constructor(paymentRepository: PaymentRepository) {
    this.#paymentRepository = paymentRepository;
  }

  public getAll() {
    return this.#paymentRepository.getAll();
  }

  public getById(id: string) {
    return this.#paymentRepository.getById(id);
  }
}
