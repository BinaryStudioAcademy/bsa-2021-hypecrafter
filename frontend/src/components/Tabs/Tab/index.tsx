import { FC } from 'react';

type TabProps = {
  title: string;
  amount?: number;
};

const Tab: FC<TabProps> = ({ children }) => <div>{children}</div>;

export default Tab;
