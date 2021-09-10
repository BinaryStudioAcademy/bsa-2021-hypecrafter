import { ChangeEvent, FC, FormEvent, useState } from 'react';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import SelectedFund from '../../../../components/SelectedFund';
import { useAction, useTypedSelector } from '../../../../hooks';
import { useLocalization } from '../../../../providers/localization';
import classes from '../../styles.module.scss';

const StartPage: FC = () => {
  const [price, setPrice] = useState('5');
  const { t } = useLocalization();
  const {
    projectId
  } = useTypedSelector(({ donate }) => donate);
  const { executeDonateAction } = useAction();

  return (
    <>
      <h2 className={classes['donate-title-start']}>{t('Choose the donation amount')}</h2>
      <div className={classes['donate-price']}>
        <SelectedFund type="donate" amount={Number(price)} />
        <form
          className={classes['donate-form']}
          onSubmit={(event: FormEvent) => {
            executeDonateAction(projectId, Number(price));
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
            type="submit"
            variant='primary'
            className={classes['donate-confirm-btn']}
          >
            {t('Confirm')}
          </Button>
        </form>
      </div>
    </>
  );
};
export default StartPage;
