import * as React from 'react';
import { FC } from 'react';
import { Nav } from 'react-bootstrap';
import TabsItem from '../tab-item';
import classes from './styles.module.scss';

const Tabs: FC = ({ children, ...rest }) => (
  <Nav className={classes.tabs} {...rest}>
    {children}
  </Nav>
);

export default Object.assign(Tabs, {
  Item: TabsItem
});
