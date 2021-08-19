import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm/checkoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.
const promise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function PaymentForm() {
  return (
    <div className="payment-form-block">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
