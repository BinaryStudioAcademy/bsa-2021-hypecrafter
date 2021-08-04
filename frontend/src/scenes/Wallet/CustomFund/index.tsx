import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import coinImg from '../../../assets/HypeCoin.png';
import classes from './styles.module.scss';

const CustomFund: FC = () => {
  const { t, i18n } = useTranslation();
  const [price, setPrice] = useState('5');
  const onSubmit = (event: React.FormEvent) => {
    console.log(price);
    event.preventDefault();
  };
  function validationPrice(value: string): boolean {
    return true;
  }
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validationPrice(event.target.value)) setPrice(event.target.value);
  };
  return (
    <div className={classes['wrp-fund-body']}>
      <Form className={classes['fund-body']} onSubmit={onSubmit}>
        <div className={classes['input-wrp']}>
          <h2> {t('Custom fund')}</h2>
          <Form.Control
            onInput={onInput}
            value={price}
            type="number"
            step="0.01"
            min="0.05"
            max="100000"
          />
        </div>

        <button type="submit"> {t('Add funds')}</button>
      </Form>
    </div>
  );
};

export default CustomFund;
