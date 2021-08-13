import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './styles.module.scss';
import Fund from '../Fund';
import CustomFund from '../CustomFund';
import coinImg from '../../../assets/HypeCoin.png';
import { useLocalization } from '../../../providers/localization';
import Button from '../../../components/Button';
import { Routes } from '../../../common/enums';

const FundsPage: FC = () => {
  const { t } = useLocalization();
  return (
    <Container fluid="sm">
      <div className={classes['wallet-header']}>
        <div className={classes.breadcrumbs}>
          <Link to={Routes.HOME}> {t('Home')}</Link>
          {' > '}
          <Link to="/account">{t('Account')}</Link>
          {' > '}
          <span>{t('Add funds to your Wallet')}</span>
        </div>
        <h2 className={classes['wallet-header-title']}>
          {t('ADD FUNDS TO YOUR')} <strong>HYPECRAFTER</strong>{' '}
          {t('WALLET')}
        </h2>
      </div>
      <h2 className={classes['addfunds-header']}>
        {t('ADD FUNDS TO YOUR WALLET')}
      </h2>
      <p className={classes['addfunds-about']}>
        {t(
          'Funds in your HypeCrafter Wallet may be used for help of any project you are interested in on HypeCrafter.'
        )}
      </p>
      <p className={classes['addfunds-about']}>
        {t('You’ll have a chance to review your order before it’s placed.')}
      </p>
      <div className={classes['wallet-page-content']}>
        <div className={classes['funds-block']}>
          <Fund price={1} />
          <Fund price={10} />
          <Fund price={50} />
          <Fund price={100} />
          <CustomFund />
        </div>
        <div className={classes['wallet-info-block']}>
          <h2 className={classes['addfunds-header']}>
            {t('YOUR HYPECRAFTER ACCOUNT')}
          </h2>
          <div className={classes['wallet-info-body']}>
            <div className={classes['wallet-balance-block']}>
              <h3>{t('Current Wallet balance')}</h3>
              <div className={classes['wallet-balance']}>
                <span>
                  0.18 <img src={coinImg} alt="Coin" />
                </span>
              </div>
            </div>
            <Button type="submit">{t('Account details')}</Button>
            <Button type="submit">{t('Transactions list')}</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default FundsPage;
