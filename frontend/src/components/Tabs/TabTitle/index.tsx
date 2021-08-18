import { FC, useCallback } from 'react';
import classes from '../styles.module.scss';

type TabTitleProps = {
  title: string;
  index: number;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};

const TabTitle: FC<TabTitleProps> = ({ title, index, selectedTab, setSelectedTab, }) => {
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
        {title}
      </button>
    </li>
  );
};

export default TabTitle;
