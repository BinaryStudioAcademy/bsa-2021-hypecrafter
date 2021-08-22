import { useEffect, useRef } from 'react';

export function useScroll(
  scrollSizeLimit: number,
  callbacks: {
    scrollOverLimitCallback: () => void;
    scrollUnderLimitCallback: () => void;
  } = {
    scrollOverLimitCallback: () => {},
    scrollUnderLimitCallback: () => {},
  }
) {
  const { scrollOverLimitCallback, scrollUnderLimitCallback } = callbacks;
  const getOffsetSize = () => window.pageYOffset;

  const state = useRef({
    prevScrollSize: getOffsetSize(),
    scrollSize: getOffsetSize(),
  }).current;

  const scrollHandler = () => {
    state.scrollSize = getOffsetSize();

    const minScrollSize = Math.min(state.prevScrollSize, state.scrollSize);
    const maxScrollSize = Math.max(state.prevScrollSize, state.scrollSize);

    if (!(scrollSizeLimit >= minScrollSize && scrollSizeLimit <= maxScrollSize)) {
      return;
    }

    if (state.scrollSize <= scrollSizeLimit) {
      scrollOverLimitCallback();
    } else {
      scrollUnderLimitCallback();
    }

    state.prevScrollSize = getOffsetSize();
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);
}
