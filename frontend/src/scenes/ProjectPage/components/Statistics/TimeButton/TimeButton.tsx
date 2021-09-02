import classnames from 'classnames';
import { TimeInterval } from 'hypecrafter-shared/enums';
import { FC } from 'react';
import Button from '../../../../../components/Button';
import { getTimeText } from '../helper';
import classes from './style.module.scss';

interface TimeButtonProps {
  isSelected: boolean;
  onHandleClick: CallableFunction;
  timeInterval: TimeInterval;
  key: string;
}

const TimeButton: FC<TimeButtonProps> = ({
  onHandleClick,
  isSelected,
  timeInterval,
  key
}) => {
  const handleClick = () => {
    onHandleClick(timeInterval);
  };

  return (
    <Button
      key={key}
      onClick={handleClick}
      className={classnames({
        [classes.item]: true,
        [classes['item-active']]: isSelected
      })}
    >
      {getTimeText(timeInterval)}
    </Button>
  );
};

export default TimeButton;
