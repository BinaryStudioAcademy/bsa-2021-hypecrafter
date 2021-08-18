import { FC } from 'react';

type TabProps = {
  title: string
};

const Tab: FC<TabProps> = ({ children }) => <div>{children}</div>;

export default Tab;
