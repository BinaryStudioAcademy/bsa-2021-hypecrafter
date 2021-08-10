import { useState } from 'react';
import Counter from '.';

const ExampleCounter = () => {
  const [inputValue, setInputValue] = useState('');
  const [counterValue, setCounterValue] = useState(4000);
  const onChangeinput = (event: any) => {
    setInputValue(event?.target?.value);
  };
  const onClickHandler = () => {
    setCounterValue(Number(inputValue) || 4000);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChangeinput} />
      <input type="button" value="Change" onClick={onClickHandler} />
      <Counter value={counterValue} />
    </div>
  );
};

export default ExampleCounter;
