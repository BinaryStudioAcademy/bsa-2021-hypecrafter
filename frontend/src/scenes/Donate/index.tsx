import { ChangeEvent, FC, FormEvent, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SelectedFund from '../../components/SelectedFund';
import { useAction } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import classes from './styles.module.scss';

interface Param{
  type: 'success' | 'failure' | 'show' | 'hide' | 'loading';
}
const Donate: FC<Param> = ({ type }) => {
  console.log(type);
  const [price, setPrice] = useState('5');
  const { t } = useLocalization();
  const { hideDonateModalAction } = useAction();
  const { executeDonateAction } = useAction();
  const start = (
    <>
      <h2>{t('Choose the donation amount')}</h2>
      <div className={classes['donate-price']}>
        <SelectedFund type="donate" amount={Number(price)} />
        <form
          className={classes['donate-form']}
          onSubmit={(event: FormEvent) => {
            console.log(price);
            event.preventDefault();
          }}
        >
          <div className={classes['donate-input-wrp']}>
            <Input
              className={classes['donate-input']}
              type='number'
              step={1}
              value={price}
              min={0}
              max={100000}
              onInput={(event: ChangeEvent<HTMLInputElement>) => {
                const priceNum = Number(event.target.value);
                if (priceNum >= 0 && priceNum <= 100000) { setPrice(event.target.value); }
              }}
            />
          </div>
          <Button
            disable={Number(price) < 1}
            type="button"
            variant='secondary'
            className={classes['donate-confirm-btn']}
            onClick={() => executeDonateAction('asdfsadfsadf', 100)}
          >
            {t('Confirm')}
          </Button>
        </form>
      </div>
    </>
  );
  const failure = (
    <>
      <h2 className={classes['donate-title-fail']}>Donate was failed</h2>
      <p className={classes['donate-sadface-fail']}>😔</p>
      <Button
        disable={Number(price) < 1}
        type="button"
        variant='secondary'
        onClick={hideDonateModalAction}
        className={classes['donate-confirm-btn']}
      >
        {t('Confirm')}
      </Button>
    </>
  );
  const success = (
    <>
      <h2 className={classes['donate-title-success']}>Donate was successful</h2>
      <p className={classes['donate-gladface-fail']}>😄</p>
      <Button
        disable={Number(price) < 1}
        type="button"
        variant='secondary'
        className={classes['donate-confirm-btn']}
        onClick={hideDonateModalAction}
      >
        {t('Confirm')}
      </Button>
    </>
  );
  console.log(start);
  console.log(failure);
  /* eslint-disable */
  const content = type === 'show' ? start : (type === 'failure' ? failure : type==='success'?success:false);
  return (
    <div className={classes['donate-page']}>
      {content}
    </div>
  );
};

export default Donate;
