import { FC, ReactElement, useState } from 'react';
import classes from '../styles.module.scss';
import TabTitle from '../TabTitle';

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
            key={item.props.title}
            index={index}
            title={item.props.title}
            counter={item.props.counter}
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
