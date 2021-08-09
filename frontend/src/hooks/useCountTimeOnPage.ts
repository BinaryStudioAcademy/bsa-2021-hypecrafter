import { useEffect, useRef } from 'react';

const timers: NodeJS.Timeout[] = [];
const useCountTimeOnPage = (callback: (time: number) => void) => {
  const timeRef = useRef(0);
  const timer = setInterval(() => {
    timeRef.current += 1;
  }, 1000);

  timers.push(timer);

  if (+`${timer}` !== +`${timers[0]}`) clearInterval(timer);

  useEffect(() => () => {
    callback(timeRef.current);
    clearInterval(timer);
  });

  return timeRef.current;
};

export default useCountTimeOnPage;
