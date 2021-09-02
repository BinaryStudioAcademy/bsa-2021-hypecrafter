import { asyncForEach } from 'hypecrafter-shared/helpers';
import { Payment } from '../models/payment';
import { paymentData } from '../seed-data/paymentData';

export default class PaymentSeeder {
  public static async execute() {
    await asyncForEach(async payment => {
      await Object.assign(new Payment(), payment).save();
    }, paymentData);
  }
}
