import { FC } from 'react';
import coinImg from '../../../../../assets/HypeCoin.png';
import { useLocalization } from '../../../../../providers/localization';
import classes from './styles.module.scss';

interface SuccessPageProps {
  isCustom: boolean;
  amount: number;
}
const SelectedFund: FC<SuccessPageProps> = (props) => {
  const { isCustom, amount } = props;
  const { t } = useLocalization();
  return (
    <div className={classes['selected-fund-wrp']}>
      <div className={classes['selected-fund']}>
        <h2>
          {isCustom ? t('Custom fund') : t('Basic fund')}
        </h2>
        <div className={classes['fund-amount']}>
          <span className={classes['fund-amount-title']}>{t('Amount')}:</span>
          <span className={classes['fund-amount-value']}>{amount}</span>
          <img src={coinImg} alt="Coin" />
        </div>
      </div>
    </div>
  );
};
export default SelectedFund;
