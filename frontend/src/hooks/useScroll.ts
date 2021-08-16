import { useEffect, useRef, useState } from 'react';

export function useScroll(
  scrollTopLimit: number,
  callbacks: {
    scrollDownCallback: () => void;
    scrollUpCallback: () => void;
  } = {
    scrollDownCallback: () => {},
    scrollUpCallback: () => {},
  }
) {
  const { scrollDownCallback, scrollUpCallback } = callbacks;
  const [bodyOffset, setBodyOffset] = useState(document.body.getBoundingClientRect());
  const [scrollTop, setScrollTop] = useState(bodyOffset.top);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  const stateRef = useRef({
    prevScrollTop: scrollTop,
    callbackBlockers: {
      overLimit: false,
      underLimit: false,
    },
  });

  const scrollHandler = () => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollTop(-bodyOffset.top);
    setScrollDirection(stateRef.current.prevScrollTop > -bodyOffset.top ? 'up' : 'down');
    stateRef.current.prevScrollTop = -bodyOffset.top;

    if (
      scrollTop >= scrollTopLimit
      && !stateRef.current.callbackBlockers.underLimit
      && scrollDirection === 'down'
    ) {
      scrollDownCallback();
      stateRef.current.callbackBlockers = {
        overLimit: false,
        underLimit: true,
      };
    } else if (
      scrollTop <= scrollTopLimit
      && !stateRef.current.callbackBlockers.overLimit
      && scrollDirection === 'up'
    ) {
      scrollUpCallback();
      stateRef.current.callbackBlockers = {
        overLimit: true,
        underLimit: false,
      };
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });
}
