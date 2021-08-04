import React, { ReactNode, FC } from 'react';
import { Nav } from 'react-bootstrap';
import classes from './styles.module.scss';

interface TabItemProps {
  children?: ReactNode;
  selected?: boolean;
}

const TabItem: FC<TabItemProps> = ({
  children,
  selected = false,
  ...rest
}) => (
  <Nav.Item
    className={selected ? classes['selected-item'] : classes.item}
    {...rest}
  >
    {children}
  </Nav.Item>
);

export default TabItem;
