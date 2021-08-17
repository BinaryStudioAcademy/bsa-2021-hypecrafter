import { FC, ReactElement, useState } from 'react';
import TabTitle from '../TabTitle';
import classes from '../styles.module.scss';

type TabsProps = {
  children: ReactElement[];
};

const Tabs: FC<TabsProps> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <ul className={classes['tabs-container']}>
        {children.map((item, index) => (
          <TabTitle
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            title={item.props.title}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          />
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
