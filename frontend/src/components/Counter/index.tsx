import React, { useEffect, useState } from 'react';
import { animateCounterDown, animateCounterUp, formate } from './helpers';
import classes from './styles.module.scss';

const Counter = React.memo(({ value }: { value: number }) => {
  const [current, setCurrent] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const isCurrentBiger = current > value;

  useEffect(() => {
    if (isCurrentBiger) {
      animateCounterDown(current, value, setCurrent, setIsChanging);
    } else {
      animateCounterUp(current, value, setCurrent, setIsChanging);
    }
    console.log(isChanging, current);
  }, [current, value]);

  return (
    <div className={classes.counter}>
      <div>Rating</div>
      <div className={isChanging ? classes.changing : classes.value}>
        {formate(current, 1)}
      </div>
    </div>
  );
});

export default Counter;
