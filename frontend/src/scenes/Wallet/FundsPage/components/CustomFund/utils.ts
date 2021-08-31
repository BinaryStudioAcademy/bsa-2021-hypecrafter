import { BASIC_FUND_AMOUNTS } from '../../../../../common/constans/payment';

export const isFundCustom = (amount: number) => !BASIC_FUND_AMOUNTS.includes(amount);
