import {
  CardElement, useElements, useStripe
} from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import React, { FormEvent, useEffect, useState } from 'react';
import { ClientSecretData } from '../../../../../common/types/payment';
import Button from '../../../../../components/Button';
import { useTypedSelector } from '../../../../../hooks';
import { getClientSecret } from '../../../../../services/payment';
import classes from './styles.module.scss';

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const { amount } = useTypedSelector(({ payment }) => payment);
  useEffect(() => {
    const params: ClientSecretData = { amount: amount.toString() };
    getClientSecret(params).then(secret => setClientSecret(secret));
    console.log('auuuuuu!');
  }, []);
  const cardStyle = {
    hidePostalCode: true,
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Courier, monospace',
        fontSmoothing: 'antialiased',
        fontSize: '20px',
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
      console.log(card);
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card
        }
      });
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        console.log(payload);
        setError('');
        setProcessing(false);
        setSucceeded(true);
      }
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className={classes['card-element-wrp']}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      </div>
      <div className={classes['btn-pay-wrp']}>
        <Button
          disabled={Boolean(processing || disabled || succeeded)}
          type="submit"
          id="submit"
        >
          <span id="button-text">
            {processing ? (
              'Load...'
            ) : (
              'Pay now'
            )}
          </span>
        </Button>
      </div>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {succeeded ? (<p>Your balance has been successfully replenished</p>) : false}

    </form>
  );
}
