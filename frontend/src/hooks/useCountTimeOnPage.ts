import { useEffect, useState } from 'react';

const useCountTimeOnPage = () => {
  const [seconds, setSeconds] = useState(0);
  const timer = setTimeout(() => setSeconds(() => seconds + 1), 1000);

  useEffect(() => {
    console.log(`time passed: ${seconds} seconds`);
    return () => clearTimeout(timer);
  }, [seconds]);

  return seconds;
};

export default useCountTimeOnPage;
