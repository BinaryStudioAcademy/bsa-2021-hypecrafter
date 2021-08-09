import { useEffect, useRef } from 'react';

const useCountTimeOnPage = (callback: (time: number) => void) => {
  const timeRef = useRef(0);
  const timer = setInterval(() => {
    timeRef.current += 1;
  }, 1000);

  if (+`${timer}` !== 1) clearInterval(timer);

  useEffect(() => () => {
    callback(timeRef.current);
    clearInterval(timer);
  });

  return timeRef.current;
};

export default useCountTimeOnPage;
