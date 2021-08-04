import { FC, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './styles.module.scss';
import Fund from '../Fund';
import CustomFund from '../CustomFund';
import coinImg from '../../assets/HypeCoin.png';

const FundsPage: FC = () => (
  <Container fluid="sm">
    <div className={classes['wallet-header']}>
      <div className={classes.breadcrumbs}>
        <Link to="/">Home</Link>
        {' > '}
        <Link to="/account">Account</Link>
        {' > '}
        <span>Add funds to your Wallet</span>
      </div>
      <h2 className={classes['wallet-header-title']}>
        ADD FUNDS TO YOUR <strong>HYPECRAFTER</strong> WALLET
      </h2>
    </div>
    <h2 className={classes['addfunds-header']}>ADD FUNDS TO YOUR WALLET</h2>
    <p className={classes['addfunds-about']}>
      Funds in your HypeCrafter Wallet may be used for help of any project you
      are interested in on HypeCrafter.
    </p>
    <p className={classes['addfunds-about']}>
      You’ll have a chance to review your order before it’s placed.
    </p>
    <div className={classes['wallet-page-content']}>
      <div className={classes['funds-block']}>
        <CustomFund />
        <Fund price={1} />
        <Fund price={10} />
        <Fund price={50} />
        <Fund price={100} />
      </div>
      <div className={classes['wallet-info-block']}>
        <h2 className={classes['addfunds-header']}>YOUR HYPECRAFTER ACCOUNT</h2>
        <div className={classes['wallet-info-body']}>
          <div className={classes['wallet-balance-block']}>
            <h3>Current Wallet balance</h3>
            <div className={classes['wallet-balance']}>
              <span>
                0.18 <img src={coinImg} alt="Coin" />
              </span>
            </div>
          </div>
          <button type="submit">Account details</button>
          <button type="submit">Transactions list</button>
        </div>
      </div>
    </div>
  </Container>
);
export default FundsPage;
