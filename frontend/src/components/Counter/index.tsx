import { useEffect, useState } from 'react';
import classes from './styles.module.scss';

function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((i) => num >= i.value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
}

const Counter = ({ value }: { value: number }) => {
  const [currVal, setCurrVal] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setIsChanging(true);

    if (currVal < value - 11) {
      setTimeout(() => setCurrVal(currVal + 11), 1);
    } else if (currVal < value) {
      setTimeout(() => setCurrVal(currVal + 1), 1);
    }
    if (currVal === value) {
      setIsChanging(false);
    }
  }, [currVal]);

  return (
    <div className={classes.counter}>
      <div>Rating</div>
      <div className={isChanging ? classes.changing : classes.value}>{nFormatter(currVal, 1)}</div>
    </div>
  );
};

export default Counter;
