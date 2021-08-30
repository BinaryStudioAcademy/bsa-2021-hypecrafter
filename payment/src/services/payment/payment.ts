import Stripe from 'stripe';
import { Transaction } from '../../common/types';
import { TransactionHistoryRepository } from '../../data/repositories';

export default class TransactionService {
  readonly #transactionHistoryRepository: TransactionHistoryRepository;

  constructor(transactionHistoryRepository: TransactionHistoryRepository) {
    this.#transactionHistoryRepository = transactionHistoryRepository;
  }

  public getAll() {
    return this.#transactionHistoryRepository.getAll();
  }
  /* eslint-disable */ 
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
    return this.#transactionHistoryRepository.getById(id);
  }

  public setTransaction(transaction: Transaction) {
    return this.#transactionHistoryRepository.setTransaction(transaction);
  }

  public getByUserId(userId: string, pageNum: number) {
    return this.#transactionHistoryRepository.getByUserId(userId, pageNum);
  }
}
