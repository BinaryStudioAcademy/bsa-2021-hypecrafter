import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './styles.module.scss';
import coinImg from '../../../assets/HypeCoin.png';

interface FundProps {
  price: number;
}
const Fund: FC<FundProps> = (props) => {
  const { t, i18n } = useTranslation();
  const { price } = props;
  function onClick() {
    // here mb should be some dispatch
    console.log(price);
  }
  return (
    <div className={classes['wrp-fund-body']}>
      <div className={classes['fund-body']}>
        <h2>
          {t('Add')}
          {` ${price}`}
          <img src={coinImg} alt="Coin" />
        </h2>
        <div className={classes['purchase-action']}>
          <span className={classes['purchase-action-price']}>
            {t('Add')}
            {` ${price}`}
            <img src={coinImg} alt="Coin" />
          </span>
          <button onClick={onClick} type="button">
            {t('Add funds')}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Fund;
