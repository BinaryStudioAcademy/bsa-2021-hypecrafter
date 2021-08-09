import { useEffect, useRef, useState } from 'react';
import formate from './helpers';
import classes from './styles.module.scss';

const Counter = ({ value }: { value: number }) => {
  const [currVal, setCurrVal] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const changeInTimeout = (start: number, nextVal: number, time: number) => {
    const timer = setTimeout(() => {
      setCurrVal(start + nextVal);
      console.log(start + nextVal);
      clearTimeout(timer);
    }, time);
  };

  useEffect(() => {
    if (currVal < value - 100) {
      changeInTimeout(currVal, 7, 10);
    } else if (currVal < value) {
      changeInTimeout(currVal, 3, 15);
    }

    setIsChanging(true);
  }, [currVal]);

  return (
    <div className={classes.counter}>
      <div>Rating</div>
      <div className={isChanging ? classes.changing : classes.value}>
        {formate(currVal, 2)}
      </div>
    </div>
  );
};

export default Counter;
