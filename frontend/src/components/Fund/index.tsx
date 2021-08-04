import { FC } from 'react';
import classes from './styles.module.scss';
import coinImg from '../../assets/HypeCoin.png';

interface FundProps {
  price: number;
}
const Fund: FC<FundProps> = (props) => {
  console.log(coinImg);
  const { price } = props;
  function onClick() {
    console.log(price);
  }
  return (
    <div className={classes['wrp-fund-body']}>
      <div className={classes['fund-body']}>
        <h2>
          {`Add ${price}`}
          <img src={coinImg} alt="Coin" />
        </h2>
        <div className={classes['purchase-action']}>
          <span className={classes['purchase-action-price']}>
            {`Add ${price}`}
            <img src={coinImg} alt="Coin" />
          </span>
          <button onClick={onClick} type="button">
            Add funds
          </button>
        </div>
      </div>
    </div>
  );
};
export default Fund;
