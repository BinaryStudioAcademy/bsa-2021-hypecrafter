import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { MIN_AMOUNT_FUND } from '../../../common/constans/payment';
import { Routes } from '../../../common/enums';
import SelectedFund from '../../../components/SelectedFund';
import { useAction, useAuth, useTypedSelector } from '../../../hooks';
import { useLocalization } from '../../../providers/localization';
import PaymentForm from './components/PaymentMenu/paymentMenu';
import classes from './styles.module.scss';

const Payment: FC = () => {
  const { isCustom, amount } = useTypedSelector(({ payment }) => payment);
  const cardType = isCustom ? 'custom-fund' : 'basic-fund';
  const { t } = useLocalization();
  const history = useHistory();
  useEffect(() => {
    if (amount < MIN_AMOUNT_FUND) {
      history.push(Routes.ADDFUNDS);
    }
  }, []);
  const { openModalAction } = useAction();
  const { id: userId } = useAuth();
  return (
    <Container fluid="sm">
      <div className={classes.breadcrumbs}>
        <Link to={Routes.HOME}> {t('Home')}</Link>
        {' > '}
        <Link to={Routes.PAYMENT} onClick={() => { openModalAction(userId as string); }}>{t('Account')}</Link>
        {' > '}
        <span>{t('Payment')}</span>
      </div>
      <h1 className={classes['payment-title']}>{t('Payment')}</h1>
      <h2 className={classes['selected-fund-title']}>{t('Selected fund')}:</h2>
      <div className={classes['payment-main-content']}>
        <div className={classes['selected-fund-wrp']}>
          <SelectedFund amount={amount} type={cardType} />
        </div>
        <div className={classes['payment-form-wrp']}>
          <PaymentForm />
        </div>
      </div>
    </Container>
  );
};
export default Payment;

