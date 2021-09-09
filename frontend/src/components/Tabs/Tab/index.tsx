/* eslint-disable react/no-unused-prop-types */
import { FC } from 'react';

type TabProps = {
  title: string;
  counter?: number;
};

const Tab: FC<TabProps> = ({ children }) => <div>{children}</div>;

export default Tab;
