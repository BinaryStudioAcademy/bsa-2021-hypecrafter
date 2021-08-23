import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MIN_AMOUNT_FUND } from '../../../common/constans/payment';
import { Routes } from '../../../common/enums';
import { useTypedSelector } from '../../../hooks';
import SuccessPage from './components/SuccessPage';

const Payment: FC = () => {
  const { isCustom, amount } = useTypedSelector(({ payment }) => payment);
  // const { t } = useLocalization();
  const history = useHistory();
  console.log(isCustom);
  useEffect(() => {
    if (amount < MIN_AMOUNT_FUND) {
      history.push(Routes.ADDFUNDS);
    }
  }, []);
  return (
    <SuccessPage />
  );
};
export default Payment;

// <Container fluid="sm">
// <div className={classes.breadcrumbs}>
//   <Link to={Routes.HOME}> {t('Home')}</Link>
//   {' > '}
//   <Link to="/account">{t('Account')}</Link>
//   {' > '}
//   <span>{t('Payment')}</span>
// </div>
// <h1 className={classes['payment-title']}>{t('Payment')}</h1>
// <h2 className={classes['selected-fund-title']}>{t('Selected fund')}:</h2>
// <div className={classes['payment-main-content']}>
//   <div className={classes['selected-fund-wrp']}>
//     <SelectedFund amount={amount} isCustom={isCustom} />
//   </div>
//   <div className={classes['payment-form-wrp']}>
//     <PaymentForm />
//   </div>
// </div>
// </Container>
