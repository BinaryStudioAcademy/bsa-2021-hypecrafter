import { useEffect, useState } from 'react';

export function useScroll(
  callbacks: {
    scrollDownCallback: () => void;
    scrollUpCallback: () => void;
  } = {
    scrollDownCallback: () => {},
    scrollUpCallback: () => {},
  }
) {
  const deadZone = 5;
  const topDeadZone = 10;
  enum ScrollCallback {
    ScrollDownCallback = 'ScrollDownCallback',
    ScrollUpCallback = 'ScrollUpCallback'
  }

  const { scrollDownCallback, scrollUpCallback } = callbacks;
  const [previousScrollTop, setPreviousScrollTop] = useState(window.pageYOffset);
  const [lastScrollCallback, setLastScrollCallback] = useState('');

  const conditionForDownHandler = (scrollTop: number) => (
    scrollTop > previousScrollTop && lastScrollCallback !== ScrollCallback.ScrollDownCallback
  );

  const conditionForUpHandler = (scrollTop: number) => (
    scrollTop < topDeadZone && scrollTop < previousScrollTop && lastScrollCallback !== ScrollCallback.ScrollUpCallback
  );

  const scrollHandler = () => {
    const scrollTop = window.pageYOffset;

    if (Math.abs(scrollTop - previousScrollTop) < deadZone) return;

    if (conditionForDownHandler(scrollTop)) {
      scrollDownCallback();
      setLastScrollCallback(ScrollCallback.ScrollDownCallback);
    } else if (conditionForUpHandler(scrollTop)) {
      scrollUpCallback();
      setLastScrollCallback(ScrollCallback.ScrollUpCallback);
    }
    setPreviousScrollTop(scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });
}
