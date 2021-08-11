import { useState, useEffect } from 'react';
import { maxMobileWidth } from '../common/constans/index';

interface Size {
  width: number | undefined;
}

export default function useWindowSize(): { windowSize: Size, isMobile: boolean } {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth
      });
      setIsMobile(window.innerWidth < maxMobileWidth);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowSize, isMobile };
}
