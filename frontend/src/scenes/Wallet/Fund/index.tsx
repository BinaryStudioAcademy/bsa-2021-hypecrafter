import { FC } from 'react';
import classes from './styles.module.scss';
import coinImg from '../../../assets/HypeCoin.png';
import { useLocalization } from '../../../providers/localization';
import Button from '../../../components/Button';

interface FundProps {
  price: number;
}
const Fund: FC<FundProps> = (props) => {
  const { t } = useLocalization();
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
          <Button className={classes['add-funds-btn']} type="submit">
            {t('Add funds')}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Fund;
