import CountTo from 'react-count-to';
import { usePrevious } from '../../hooks';
import { formate } from './helpers';
import classes from './styles.module.scss';

interface Props {
  to: number;
  label: string;
}

const Counter = ({ to, label }: Props) => {
  const from = usePrevious(to);

  return (
    <div className={classes.counter}>
      <div>{label}</div>
      <CountTo from={from} to={to} speed={1234}>
        {(value: number) => <div className={classes.value}>{formate(value, 1)}</div>}
      </CountTo>
    </div>
  );
};

export default Counter;
