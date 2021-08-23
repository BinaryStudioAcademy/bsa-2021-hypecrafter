import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm/checkoutForm';
import classes from './styles.module.scss';
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.
let key = 'pk_test_51JQgGgGRFB1tFI4iuDfGNDUcyTXzO3NSyXP7v7G77C';
key += 'lfp3EKHACEk04yQ6otxsoKSr8tno6UI4rcROIeVc7zFI5G00IKraG6K0';
const promise = loadStripe(key, { locale: 'en' });

export default function PaymentForm() {
  return (
    <div className={classes['payment-form-block']}>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
