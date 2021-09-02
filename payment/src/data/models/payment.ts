import { model, Schema } from 'mongoose';
import { Payment as PaymentType } from '../../common/types';

export const PaymentSchema = new Schema({
  total: Schema.Types.Decimal128,
  balance: Schema.Types.Decimal128,
  userId: Schema.Types.String,
  type: Schema.Types.String,
  item: Schema.Types.String,
  createdAt: { type: Schema.Types.Date, default: Date.now },
});

export const Payment = model<PaymentType>('Payment', PaymentSchema);
