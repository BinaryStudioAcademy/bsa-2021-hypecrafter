import { useEffect, useRef, useState } from 'react';

enum Directions {
  Up = 'up',
  Down = 'down',
  None = 'none'
}

export function useScroll(
  scrollSizeLimit: number,
  callbacks: {
    scrollDownCallback: () => void;
    scrollUpCallback: () => void;
  } = {
    scrollDownCallback: () => {},
    scrollUpCallback: () => {},
  }
) {
  const getOffsetSize = () => window.scrollY;
  const [scrollSize, setScrollSize] = useState(getOffsetSize());
  const [scrollDirection, setScrollDirection] = useState<Directions>(Directions.None);
  const [prevScrollDirection, setPrevScrollDirection] = useState<Directions>(Directions.None);
  const { scrollDownCallback, scrollUpCallback } = callbacks;

  const stateRef = useRef({
    prevScrollSize: scrollSize,
    callbackBlocker: false,
  });

  const scrollHandler = () => {
    setScrollSize(getOffsetSize());
    setPrevScrollDirection(scrollDirection);
    setScrollDirection(stateRef.current.prevScrollSize > getOffsetSize() ? Directions.Up : Directions.Down);
    stateRef.current.prevScrollSize = getOffsetSize();

    if (prevScrollDirection === scrollDirection) {
      return;
    }

    if (scrollSize <= scrollSizeLimit) {
      setPrevScrollDirection(Directions.None);
      scrollUpCallback();
    } else if (scrollDirection === Directions.Up) {
      scrollUpCallback();
    } else if (scrollDirection === Directions.Down) {
      scrollDownCallback();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });
}
