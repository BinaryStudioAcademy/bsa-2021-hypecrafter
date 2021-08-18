import { FC } from 'react';
import coinImg from '../../../../../assets/HypeCoin.png';
import Button from '../../../../../components/Button';
import { useAction } from '../../../../../hooks';
import { useLocalization } from '../../../../../providers/localization';
import classes from './styles.module.scss';

interface FundProps {
  price: number;
}
const Fund: FC<FundProps> = (props) => {
  const { t } = useLocalization();
  const { price } = props;
  const { setFundAction } = useAction();
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
          <Button className={classes['add-funds-btn']} type="submit" onClick={() => setFundAction(price, false)}>
            {t('Add funds')}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Fund;
