import React, { FC, useState } from 'react';
import { Form } from 'react-bootstrap';
import classes from './styles.module.scss';
import { useLocalization } from '../../../providers/localization';
import Button from '../../../components/Button';

const CustomFund: FC = () => {
  const { t } = useLocalization();
  const [price, setPrice] = useState('5');
  const onSubmit = (event: React.FormEvent) => {
    console.log(price);
    event.preventDefault();
  };
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
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

        <Button className={classes['add-funds-btn']} type="submit">
          {' '}
          {t('Add funds')}
        </Button>
      </Form>
    </div>
  );
};

export default CustomFund;