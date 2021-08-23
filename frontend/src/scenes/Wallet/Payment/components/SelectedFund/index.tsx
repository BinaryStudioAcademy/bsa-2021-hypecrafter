import { FC } from 'react';
import coinImg from '../../../../../assets/HypeCoin.png';
import classes from './styles.module.scss';

interface SuccessPageProps {
  isCustom: boolean;
  amount: number;
}
const SelectedFund: FC<SuccessPageProps> = (props) => {
  const { isCustom, amount } = props;
  return (
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
  );
};
export default SelectedFund;
