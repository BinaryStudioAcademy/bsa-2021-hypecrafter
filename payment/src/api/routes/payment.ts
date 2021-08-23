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

const endpointSecret = 'whsec_AEOtiS8j2Tj8G1lSgtG8GjsWI6IxjMHh';

const init = ({ paymentService }: Services, path: string) => (app: MicroMq) => app.get(
  `${path}/:userId/:page`,
  wrap<Empty, Page, { page: string, userId: string }, Empty>((req) => paymentService
    .getByUserId(req.params.userId, req.params.page))
).post(`${path}/create-payment-intent`,
  wrap< Empty, { clientSecret: string }, { amount: number }, Empty>(async (req) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method_types: ['card']
    });
    console.log(paymentIntent.client_secret);
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
        case 'payment_intent.succeeded':
          console.log(`PaymentIntent for ${payload.amount} was successful!`);
          break;
        default:
          console.log(`Unhandled event type ${event.type}.`);
      }
      return { status: 200 };
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      throw err;
    }
  }));
export default init;
