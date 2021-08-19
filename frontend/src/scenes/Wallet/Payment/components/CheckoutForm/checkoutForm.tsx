import {
  CardElement
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

export default function CheckoutForm() {
  const [succeeded] = useState(false);
  const [error] = useState(null);
  const [processing] = useState('');
  const [disabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  // const stripe = useStripe();
  // const elements = useElements();
  console.log(clientSecret);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] })
      })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };
  return (
    <form id="payment-form">
      <CardElement id="card-element" options={cardStyle} />
      <button
        disabled={Boolean(processing || disabled || succeeded)}
        type="submit"
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner" />
          ) : (
            'Pay now'
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a
          href="https://dashboard.stripe.com/test/payments"
        >
          {' '}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  );
}
