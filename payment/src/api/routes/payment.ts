import MicroMq from 'micromq';
import Stripe from 'stripe';
import { Page } from '../../common/types';
import { env } from '../../env';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const key = env.app.payment.private_key;
const stripe = new Stripe(key, {
  apiVersion: '2020-08-27',
});

const endpointSecret = env.app.payment.webhook_key;

const init = ({ paymentService }: Services, path: string) => (app: MicroMq) => app.get(
  `${path}/:page`,
  wrap<Empty, Page, { page: string }, Empty>((req) => {
    console.log('()()()()()()()');
    return paymentService
      .getByUserId(req.headers.userId?.toString(), req.params.page);
  })
).post(`${path}/create-payment-intent`,
  wrap< Empty, { clientSecret: string }, { amount: number }, Empty>(async (req) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        userId: req.headers.userId.toString()
      }
    });
    return ({
      clientSecret: paymentIntent.client_secret
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
          console.log(`PaymentIntent for ${payload.amount / 100}$ was successful!`);
          const { response } = await app.ask('backend', {
            server: {
              action: 'replenishment',
              meta: {
                id: payload.metadata.userId,
                amount: payload.amount / 100,
              },
            }
          }) as { response: { ok: boolean, balance: number } };
          if (response.ok) {
            // await paymentService.setTransaction({
            //   balance: response.balance,
            //   item: 'Balance replenishment',
            //   type: 'Custom Fund',
            //   total: payload.amount / 100,
            //   userId: 'c7a6e4d5-3906-47aa-ac82-8b1211f470f7'
            // });
            console.log(response);
          }
          break;
        }
        default:
          console.log(`Unhandled event type ${event.type}.`);
      }
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      throw err;
    }
    console.log('return');
    return { status: 200 };
  }));
export default init;
