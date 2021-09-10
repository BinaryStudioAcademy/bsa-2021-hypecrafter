import { FC } from 'react';
import coinImg from '../../assets/HypeCoin.png';
import { useLocalization } from '../../providers/localization';
import classes from './styles.module.scss';

interface SuccessPageProps {
  type: 'basic-fund' | 'custom-fund' | 'donate';
  amount: number;
}
const SelectedFund: FC<SuccessPageProps> = ({ type, amount }) => {
  const { t } = useLocalization();
  let title:LocaleKeys = 'Custom fund';
  if (type === 'basic-fund') { title = 'Basic fund'; } else title = 'Donate';
  return (
    <div className={classes['selected-fund-wrp']}>
      <div className={classes['selected-fund']}>
        <h2>
          {t(title)}
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
