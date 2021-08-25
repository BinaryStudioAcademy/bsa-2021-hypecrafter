import ConfettiExplosion from '@reonomy/react-confetti-explosion';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../../../common/enums';
import { useTypedSelector } from '../../../../../hooks';
import { useLocalization } from '../../../../../providers/localization';
import SelectedFund from '../SelectedFund';
import classes from './styles.module.scss';

const SuccessPage: FC = () => {
  const history = useHistory();
  const { isCustom, amount } = useTypedSelector(
    (
      { payment }
    ) => payment
  );
  const { t } = useLocalization();
  return (
    <div className={classes['root-payment-success']}>
      <div className={classes.confetti}>
        <ConfettiExplosion particleCount={25} particleSize={15} />
        <ConfettiExplosion particleCount={25} particleSize={15} />
      </div>
      <h1><span className={classes['payment-success-title']}>{t('Congratulation!')}</span></h1>
      <h2 className={classes['payment-success-about']}>
        <span>{t('Payment transaction was successful')}</span>
      </h2>
      <SelectedFund isCustom={isCustom} amount={amount} />
      <Button className={classes['btn-return-success-payment']} onClick={() => history.push(Routes.HOME)}>
        {t('Return to Main Page')}
      </Button>
    </div>
  );
};

export default SuccessPage;
