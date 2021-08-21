import MicroMq from 'micromq';
import Stripe from 'stripe';
import { Page } from '../../common/types';
import { wrap } from '../../helpers';
import { Services } from '../../services';

let key = 'sk_test_51JQgGgGRFB1tFI4ionmL4tsEBhzwKUbF4SkfFtQJFzkz';
key += 'YGvbt4wV2NvBHW885jeZjrPoW0hNmZOFyOi7LSQuNi2U00oB8x5kPf';
const stripe = new Stripe(key, {
  apiVersion: '2020-08-27',
});

const init = ({ paymentService }: Services, path: string) => (app: MicroMq) => app.get(
  `${path}/:userId/:page`,
  wrap<Empty, Page, { page: string, userId: string }, Empty>((req) => paymentService
    .getByUserId(req.params.userId, req.params.page))
).post(`${path}/create-payment-intent`,
  wrap< Empty, { clientSecret: string }, { amount: number }, Empty>(async (req) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });
    console.log(paymentIntent.client_secret);
    return ({
      clientSecret: paymentIntent.client_secret
    });
  }));

export default init;
