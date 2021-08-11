import { useEffect, useRef } from 'react';
import { delay } from '../common/constans';

const timers: NodeJS.Timeout[] = [];
const useCountTimeOnPage = (callback: (time: number) => void) => {
  const timeRef = useRef(0);
  const timer = setInterval(() => {
    timeRef.current += 1;
  }, delay);

  timers.push(timer);

  if (+`${timer}` !== +`${timers[0]}`) clearInterval(timer);

  useEffect(() => () => {
    callback(timeRef.current);
    clearInterval(timer);
  });

  return timeRef.current;
};

export { useCountTimeOnPage };
