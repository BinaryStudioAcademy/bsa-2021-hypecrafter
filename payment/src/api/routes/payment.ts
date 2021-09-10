/* eslint-disable */
import MicroMq from 'micromq';
import Stripe from 'stripe';
import { Page } from '../../common/types';
import { env } from '../../env';
import { wrap } from '../../helpers';
import { Services } from '../../services';

interface MetaNewDonate{
  userId: string,
  total: number,
  item: string
}

const key = env.app.payment.private_key;
const stripe = new Stripe(key, {
  apiVersion: '2020-08-27',
});

const endpointSecret = env.app.payment.webhook_key;

const init = ({ paymentService }: Services, path: string) => (app: MicroMq) => {app.get(
  `${path}/:page`,
  wrap<Empty, Page, { page: string }, Empty>((req) =>{
    return paymentService
        .getByUserId(req.headers.userId as string, req.params.page)})
).post(`${path}/create-payment-intent`,
  wrap< Empty, { clientSecret: string }, { amount: number }, Empty>(async (req) => {
    const { amount } = req.body;
    const clientSecret = await paymentService.getClientSecret(stripe, amount, req.headers.userId as string);

    return ({
      clientSecret
    });
  }))
  .post(`${path}/webhook`, wrap< Empty, { status: number }, Stripe.Event, Empty>(async req => {
    const payloadString = JSON.stringify(req.body, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });
    try {
      const event: Stripe.Event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
      const payload = event.data.object as Stripe.PaymentIntent;
      switch (event.type) {
        case 'payment_intent.succeeded': {
          await paymentService.setPayment({
            item: 'Balance replenishment',
            type: 'Custom Fund',
            total: payload.amount / 100,
            userId: payload.metadata.userId
          });
          break;
        }
        default:
      }
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      throw err;
    }
    return { status: 200 };
  }));

  app.action('new_donate', async (meta, res) => {
    const {item, total, userId} = meta as MetaNewDonate;
    await paymentService.setPayment({
      item,
      type: 'Pledge project',
      total,
      userId
    });
    res.json({ ok: true });
  });
  return app;
}
export default init;
