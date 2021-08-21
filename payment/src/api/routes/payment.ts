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

// stripe.webhookEndpoints.create({
//   url: 'http://localhost:3001/webhook',
//   enabled_events: [
//     'charge.failed',
//     'charge.succeeded',
//   ],
// }).then(res => console.log(res));

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
  .post(`${path}/webhook`, wrap< Empty, { status: number }, { type: string, data: { object: Stripe.PaymentIntent } }
  , Empty>(async req => {
    const event = req.body;
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log(`PaymentIntent for ${event.data.object.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        console.log(event.data.object);
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    return { status: 200 };
  }));
export default init;
