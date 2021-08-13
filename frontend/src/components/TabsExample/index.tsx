import { FC } from 'react';
import { Nav } from 'react-bootstrap';
import { Tabs } from '../Tabs';

const TabsExample: FC = () => {
  const tabs = ['Projects', 'Achievements', 'About me'];

  return (
    <Tabs>
      <Tabs.Item>
        <Nav.Link>{tabs[0]}</Nav.Link>
      </Tabs.Item>
      <Tabs.Item selected>
        <Nav.Link>{tabs[1]}</Nav.Link>
      </Tabs.Item>
      <Tabs.Item>
        <Nav.Link>{tabs[2]}</Nav.Link>
      </Tabs.Item>
    </Tabs>
  );
};

export default TabsExample;
