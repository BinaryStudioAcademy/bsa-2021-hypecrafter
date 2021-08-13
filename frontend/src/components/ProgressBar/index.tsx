import { FC } from 'react';
import { ProgressBar } from 'react-bootstrap';
import classes from './styles.module.scss';

type Props = {
  goal: number,
  percent: number,
};

const ProgressBarComponent: FC<Props> = ({ goal, percent }) => (
  <div className={classes.progress}>
    <div className={classes['progress-info']}>
      <div className={classes.goal}>{`$ ${goal}`}</div>
      <div className={classes.percent}>{`${percent}%`}</div>
    </div>
    <ProgressBar className={classes['progress-bar']} now={percent} label={`${percent}%`} visuallyHidden />
  </div>
);

export default ProgressBarComponent;
