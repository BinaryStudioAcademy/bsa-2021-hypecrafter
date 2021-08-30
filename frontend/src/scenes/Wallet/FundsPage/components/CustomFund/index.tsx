import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../../../common/enums';
import Button from '../../../../../components/Button';
import Input from '../../../../../components/Input';
import { useAction } from '../../../../../hooks';
import { useLocalization } from '../../../../../providers/localization';
import classes from './styles.module.scss';
import { isFundCustom } from './utils';

const CustomFund: FC = () => {
  const { t } = useLocalization();
  const [price, setPrice] = useState('5');
  const { setFundAction } = useAction();
  const history = useHistory();
  const onSubmit = (event: FormEvent) => {
    const priceNum = parseInt(price, 10);
    console.log(isFundCustom(priceNum));
    setFundAction(priceNum, isFundCustom(priceNum));
    history.push(Routes.PAYMENT);
    event.preventDefault();
  };
  return (
    <div className={classes['wrp-fund-body']}>
      <Form className={classes['fund-body']} onSubmit={onSubmit}>
        <div className={classes['input-wrp']}>
          <h2> {t('Custom fund')}</h2>
          <Input
            type='number'
            step={1}
            value={price}
            min={1}
            max={100000}
            onInput={(event: ChangeEvent<HTMLInputElement>) => setPrice(event.target.value)}
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
