import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { env } from '../../../../../env';
import CheckoutForm from './CheckoutForm/checkoutForm';
import classes from './styles.module.scss';

export default function PaymentForm() {
  const stripe = loadStripe(env.payment.key || '', { locale: 'en' });
  return (
    <div className={classes['payment-form-block']}>
      <Elements stripe={stripe}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

