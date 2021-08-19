import {
  CardElement, useElements, useStripe
} from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import React, { FormEvent, useEffect, useState } from 'react';

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
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
        fontFamily: 'Courier, monospace',
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
    },
    'data-locale': 'language'
  };
  const handleChange = async (event: StripeCardElementChangeEvent) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };
  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const card = elements?.getElement(CardElement);
    setProcessing(true);
    if (stripe && card) {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card
        }
      });
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError('');
        setProcessing(false);
        setSucceeded(true);
      }
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
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
