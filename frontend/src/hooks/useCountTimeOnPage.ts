import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const useCountTimeOnPage = (callback: (time: number) => void) => {
  const history = useHistory();
  const timeRef = useRef(0);

  useEffect(() => () => {
    timeRef.current = Date.now();
    history.block(() => { callback(Date.now() - timeRef.current); });
  });
};

export { useCountTimeOnPage };
