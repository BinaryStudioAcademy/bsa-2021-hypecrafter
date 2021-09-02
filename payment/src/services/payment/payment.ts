/* eslint-disable class-methods-use-this */
import Stripe from 'stripe';
import { NewPayment } from '../../common/types';
import { PaymentRepository } from '../../data/repositories';

export default class PaymentService {
  readonly #paymentRepository: PaymentRepository;

  constructor(paymentRepository: PaymentRepository) {
    this.#paymentRepository = paymentRepository;
  }

  public getAll() {
    return this.#paymentRepository.getAll();
  }

  public async getClientSecret(stripe: Stripe, amount: number, userId: string) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        userId
      }
    });
    return paymentIntent.client_secret;
  }

  public getById(id: string) {
    return this.#paymentRepository.getById(id);
  }

  public setPayment(payment: NewPayment) {
    return this.#paymentRepository.setPayment(payment);
  }

  public getByUserId(userId: string, pageNum: number) {
    return this.#paymentRepository.getByUserId(userId, pageNum);
  }
}
