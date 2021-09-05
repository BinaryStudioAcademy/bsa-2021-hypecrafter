/* eslint-disable react/require-default-props */
import { FC, useCallback } from 'react';
import classes from '../styles.module.scss';

type TabTitleProps = {
  title: string;
  counter?: number;
  index: number;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};

const TabTitle: FC<TabTitleProps> = ({ title, counter, index, selectedTab, setSelectedTab, }) => {
  const isSelected = selectedTab === index;

  const changeTabHandler = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <li>
      <button
        type="button"
        onClick={changeTabHandler}
        className={`${classes['tab-title']} ${isSelected && classes['tab-title-selected']}`}
      >
        <div className={classes['tab-info']}>
          <div className={classes.title}>{title}</div>
          {counter !== 0 && <div className={classes.counter}>{counter}</div>}
        </div>
      </button>
    </li>
  );
};

export default TabTitle;
