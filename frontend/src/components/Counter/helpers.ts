type ChangeType = 'up' | 'down';
type setNum = React.Dispatch<React.SetStateAction<number>>;
type setBool = React.Dispatch<React.SetStateAction<boolean>>;

function changeInTimeout(setCurrent: setNum) {
  return (start: number, nextVal: number, time: number, type: ChangeType) => {
    const timer = setTimeout(() => {
      if (type === 'up') {
        setCurrent(start + nextVal);
      } else {
        setCurrent(start - nextVal);
      }
      clearTimeout(timer);
    }, time);
  };
}

function animateCounterDown(
  current: number,
  value: number,
  setCurrent: setNum,
  setIsChanging: setBool
) {
  setIsChanging(true);

  if (current > value + 100) {
    changeInTimeout(setCurrent)(current, 7, 4, 'down');
  } else if (current < value + 100 && current > value + 30) {
    changeInTimeout(setCurrent)(current, 9, 15, 'down');
  } else if (current > value) {
    changeInTimeout(setCurrent)(current, 3, 30, 'down');
  }

  if (current <= value) {
    setIsChanging(false);
    setCurrent(value);
  }
}

const animateCounterUp = (
  current: number,
  value: number,
  setCurrent: React.Dispatch<React.SetStateAction<number>>,
  setIsChanging: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsChanging(true);

  if (current < value - 100) {
    changeInTimeout(setCurrent)(current, 7, 4, 'up');
  } else if (current > value - 100 && current < value - 30) {
    changeInTimeout(setCurrent)(current, 9, 15, 'up');
  } else if (current < value) {
    changeInTimeout(setCurrent)(current, 3, 30, 'up');
  }

  if (current >= value) {
    setIsChanging(false);
    setCurrent(value);
  }
};

const formate = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((i) => num >= i.value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

export { formate, changeInTimeout, animateCounterUp, animateCounterDown };
