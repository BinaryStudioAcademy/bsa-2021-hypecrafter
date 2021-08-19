import CountTo from 'react-count-to';
import { formate } from './helpers';
import classes from './styles.module.scss';

const Counter = ({ value: end }: { value: number }) => (
  <div className={classes.counter}>
    <div>Rating</div>
    <CountTo to={end} speed={1234}>
      {(value) => <div className={classes.value}>{formate(value, 1)}</div>}
    </CountTo>
  </div>
);

export default Counter;
