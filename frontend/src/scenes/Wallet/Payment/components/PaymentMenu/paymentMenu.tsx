import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { env } from '../../../../../env';
import CheckoutForm from './CheckoutForm/checkoutForm';
import classes from './styles.module.scss';
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.
const promise = loadStripe(env.payment.key || '', { locale: 'en' });
export default function PaymentForm() {
  return (
    <div className={classes['payment-form-block']}>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

