import { FC } from 'react';
import { Tabs, Tab } from '../Tabs';

const Test = () => (
  <div>
    <h3>Hi</h3>
    <p>Test component here</p>
  </div>
);

const TabsExample: FC = () => (
  <Tabs>
    <Tab title="Lemon">Lemon is yellow</Tab>
    <Tab title="Strawberry"><Test /></Tab>
    <Tab title="Pear">Pear is green</Tab>
  </Tabs>
);

export default TabsExample;
