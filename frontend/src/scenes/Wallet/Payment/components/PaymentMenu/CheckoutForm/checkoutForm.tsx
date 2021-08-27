import {
  CardElement, useElements, useStripe
} from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../../../../common/enums';
import { ClientSecretData } from '../../../../../../common/types/payment';
import Button from '../../../../../../components/Button';
import { useTypedSelector } from '../../../../../../hooks';
import { useLocalization } from '../../../../../../providers/localization';
import { getClientSecret } from '../../../../../../services/payment';
import classes from './styles.module.scss';
import { cardOption } from './utils';

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useLocalization();
  const { amount } = useTypedSelector(({ payment }) => payment);
  useEffect(() => {
    const params: ClientSecretData = { amount: amount.toString() };
    getClientSecret(params).then(secret => { setClientSecret(secret); });
  }, []);
  const handleChange = async (event: StripeCardElementChangeEvent) => {
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
  useEffect(() => {
    if (succeeded) { history.push(Routes.PAYMENT_SUCCESS); }
  }, [succeeded]);
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className={classes['card-element-wrp']}>
        <CardElement id="card-element" options={cardOption} onChange={handleChange} />
      </div>
      <div className={classes['btn-pay-wrp']}>
        <Button
          disable={Boolean(processing || disabled)}
          loading={processing}
          type="submit"
          id="submit"
        >
          <span id="button-text">
            {processing
              ? t('Load...')
              : t('Pay')}
          </span>
        </Button>
      </div>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <span className={classes['card-payment-error']} role="alert">
          {error}
        </span>
      )}

    </form>
  );
}
