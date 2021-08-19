import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import coinImg from '../../../assets/HypeCoin.png';
import { MIN_AMOUNT_FUND } from '../../../common/constans/payment';
import { Routes } from '../../../common/enums';
import { useTypedSelector } from '../../../hooks';
import { useLocalization } from '../../../providers/localization';
import PaymentForm from './components/paymentMenu';
import classes from './styles.module.scss';

const Payment: FC = () => {
  const { isCustom, amount } = useTypedSelector(({ payment }) => payment);
  const { t } = useLocalization();
  const history = useHistory();
  useEffect(() => {
    if (amount < MIN_AMOUNT_FUND) {
      history.push(Routes.ADDFUNDS);
    }
  }, []);
  return (
    <Container fluid="sm">
      <div className={classes.breadcrumbs}>
        <Link to={Routes.HOME}> {t('Home')}</Link>
        {' > '}
        <Link to="/account">{t('Account')}</Link>
        {' > '}
        <span>{t('Payment')}</span>
      </div>
      <h1 className={classes['payment-title']}>{t('Payment')}</h1>
      <h2 className={classes['selected-fund-title']}>{t('Selected fund')}:</h2>
      <div className={classes['payment-main-content']}>
        <div className={classes['selected-fund-wrp']}>
          <div className={classes['selected-fund']}>
            <h2>
              {isCustom ? 'Custom fund' : 'Basic fund'}
            </h2>
            <div className={classes['fund-amount']}>
              <span className={classes['fund-amount-title']}>Amount: </span>
              <span className={classes['fund-amount-value']}>{amount}</span>
              <img src={coinImg} alt="Coin" />
            </div>
          </div>
        </div>
        <PaymentForm />
      </div>
    </Container>
  );
};

export default Payment;
