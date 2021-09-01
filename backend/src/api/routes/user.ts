import MicroMq from 'micromq';
import Stripe from 'stripe';
import { UserProfile } from '../../common/types';
import { env } from '../../env';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const key = env.app.payment.private_key;
const stripe = new Stripe(key, {
  apiVersion: '2020-08-27',
});

const endpointSecret = env.app.payment.webhook_key;

const init = ({ userService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => userService.getAll()))
  .get(`${path}/:id`, wrap<Empty, UserProfile, { id: string }, Empty>((req) => userService.getById(req.params.id)))
  .post(`${path}/webhook`, wrap< Empty, { status: number }, Stripe.Event, Empty>(async req => {
    const payloadString = JSON.stringify(req.body, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });
    try {
      const event: Stripe.Event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
      const payload = event.data.object as Stripe.PaymentIntent;
      console.log(payload.metadata.userId);
      switch (event.type) {
        case 'payment_intent.succeeded': {
          await userService.replenishment(payload.metadata.userId, payload.amount / 100);
          console.log(`Replenishment for ${payload.amount / 100}$ was successful!`);
          break;
        }
        default:
          console.log(`Unhandled event type ${event.type}.`);
      }
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      throw err;
    }
    return { status: 200 };
  }))
  .put(`${path}/:id`, wrap<Empty, UserProfile, UserProfile, Empty>(req => (
    userService.updateById({ id: req.params.id, data: req.body })
  )));

export default init;
