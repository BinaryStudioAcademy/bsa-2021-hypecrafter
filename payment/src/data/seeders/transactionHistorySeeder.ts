import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { TransactionHistory } from '../entities/transactionHistory';
import { transactionHistoryData } from '../seed-data/transactionHistoryData';

export default class TransactionHistorySeeder {
  public static async execute() {
    await asyncForEach(async history => {
      await Object.assign(new TransactionHistory(), history).save();
    }, transactionHistoryData);
  }
}
