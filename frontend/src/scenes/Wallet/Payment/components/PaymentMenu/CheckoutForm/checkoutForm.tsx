import {
  CardElement, useElements, useStripe
} from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import React, { FormEvent, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../../../../common/enums';
import { ClientSecretData } from '../../../../../../common/types/payment';
import Button from '../../../../../../components/Button';
import { useTypedSelector } from '../../../../../../hooks';
import { useLocalization } from '../../../../../../providers/localization';
import { getClientSecret } from '../../../../../../services/payment';
import { CheckoutFormActions, CheckoutFormReducer } from './reducer';
import classes from './styles.module.scss';
import { cardOption } from './utils';

const initState = {
  succeeded: false,
  error: '',
  processing: false,
  disabled: true,
  clientSecret: ''
};

export default function CheckoutForm() {
  const [state, dispatch] = useReducer(CheckoutFormReducer, initState);
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useLocalization();
  const { amount } = useTypedSelector(({ payment }) => payment);
  useEffect(() => {
    const params: ClientSecretData = { amount };
    getClientSecret(params).then(secret => { dispatch({ type: CheckoutFormActions.CLIENTSECRET, payload: secret }); });
  }, []);
  const handleChange = (event: StripeCardElementChangeEvent) => {
    dispatch({ type: CheckoutFormActions.DISABLED, payload: event.empty });
    dispatch({ type: CheckoutFormActions.ERROR, payload: event.error ? event.error.message : '' });
  };
  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const card = elements?.getElement(CardElement);
    dispatch({ type: CheckoutFormActions.PROCESSING, payload: true });
    if (stripe && card) {
      const payload = await stripe.confirmCardPayment(state.clientSecret, {
        payment_method: {
          card
        }
      });
      if (payload.error) {
        dispatch({ type: CheckoutFormActions.ERROR, payload: `Payment failed ${payload.error.message}` });
        dispatch({ type: CheckoutFormActions.PROCESSING, payload: false });
      } else {
        dispatch({ type: CheckoutFormActions.ERROR, payload: '' });
        dispatch({ type: CheckoutFormActions.PROCESSING, payload: false });
        dispatch({ type: CheckoutFormActions.SUCCEEDED, payload: true });
      }
    }
  };
  useEffect(() => {
    if (state.succeeded) { history.push(Routes.PAYMENT_SUCCESS); }
  }, [state.succeeded]);
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className={classes['card-element-wrp']}>
        <CardElement id="card-element" options={cardOption} onChange={handleChange} />
      </div>
      <div className={classes['btn-pay-wrp']}>
        <Button
          disable={Boolean(state.processing || state.disabled)}
          loading={state.processing}
          type="submit"
          id="submit"
        >
          <span id="button-text">
            {state.processing
              ? t('Loading...')
              : t('Pay')}
          </span>
        </Button>
      </div>
      {state.error && (
        <span className={classes['card-payment-error']} role="alert">
          {t(state.error as LocaleKeys)}
        </span>
      )}

    </form>
  );
}
