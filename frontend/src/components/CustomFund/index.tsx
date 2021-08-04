import React, { FC, useState } from 'react';
import { Form } from 'react-bootstrap';
import coinImg from '../../assets/HypeCoin.png';
import classes from './styles.module.scss';

const Fund: FC = () => {
  const [price, setPrice] = useState('5');
  const onSubmit = (event: React.FormEvent) => {
    console.log(price);
    event.preventDefault();
  };
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (Number(event.target.value) >= 0 || event.target.value === '')
    ) {
      setPrice(event.target.value);
    }
  };
  return (
    <div className={classes['wrp-fund-body']}>
      <Form className={classes['fund-body']} onSubmit={onSubmit}>
        <div className={classes['input-wrp']}>
          <h2>Custom fund</h2>
          <Form.Control onInput={onInput} value={price} />
        </div>
        <div className={classes['purchase-action']}>
          <span className={classes['purchase-action-price']}>
            {`Add ${price === '' ? 0 : price}`}
            <img src={coinImg} alt="Coin" />
          </span>
          <button type="submit">Add funds</button>
        </div>
      </Form>
    </div>
  );
};

export default Fund;
