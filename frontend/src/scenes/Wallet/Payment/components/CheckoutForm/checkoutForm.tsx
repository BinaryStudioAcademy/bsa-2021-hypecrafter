import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FormEvent } from 'react';
import classes from './styles.module.scss';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      });
      if (error) {
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }
    }
  };

  return (
    <form className={classes['card-form']} onSubmit={handleSubmit}>
      <CardElement onChange />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
