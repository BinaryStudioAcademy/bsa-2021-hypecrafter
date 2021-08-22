import { getCustomRepository } from 'typeorm';
import { BalanceRepository, TransactionHistoryRepository } from '../data/repositories';
import BalanceService from './balance';
import TransactionHistoryService from './transaction';

export function initServices() {
  return {
    transactionHistoryService: new TransactionHistoryService(getCustomRepository(TransactionHistoryRepository)),
    balanceService: new BalanceService(getCustomRepository(BalanceRepository))
  };
}

export interface Services {
  transactionHistoryService: TransactionHistoryService,
  balanceService: BalanceService
}

