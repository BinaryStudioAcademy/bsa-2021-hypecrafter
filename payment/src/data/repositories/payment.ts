/* eslint-disable class-methods-use-this */
import { NewPayment, paginationStep } from '../../common/types';
import { Payment } from '../models/payment';

export class PaymentRepository {
  public getAll() {
    return Payment.find().exec();
  }

  public getCountByUserId(userId: string) {
    return Payment.count({ userId }).exec();
  }

  public getById(id: string) {
    return Payment.findOne({ id }).exec();
  }

  public setPayment(payment: NewPayment) {
    return Object.assign(new Payment(), payment).save();
  }

  public async getByUserId(userId: string, pageNum: number) {
    const skipNum = (pageNum - 1) * paginationStep;
    const count = await this.getCountByUserId(userId);
    const page = await Payment.find()
      .select(['"createdAt"', 'item', 'type', 'total'])
      .sort({ createdAt: 'asc' })
      .skip(skipNum)
      .limit(paginationStep)
      .lean();
    const isLast = count <= pageNum * paginationStep;

    return {
      isLast,
      page: page.map((payment) => ({
        ...payment,
        total: Number(payment.total) / 100,
      })),
    };
  }
}
