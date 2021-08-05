import { useState } from 'react';
import UserPage from '../../scenes/UserPage';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import ButtonExample from '../ButtonExample';
import CardExample from '../CardExample';
import Chart from '../Chart/Chart';
import defaultProps from '../Chart/testprops';
import InputExample from '../InputExample';
import ModalWindow from '../ModalWindow';
import PopoverExample from '../PopoverExample';
import TabsExample from '../TabsExample';
import TextStyleExample from '../TextStyleExample';
import TranslateExample from '../TranslateExample';

function Main() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <TabsExample />
      <Chart
        type={defaultProps.type}
        labels={defaultProps.data.labels}
        dataSets={defaultProps.data.datasets}
      />
      <Users />
      <PopoverExample />
      <ModalWindow
        show={show}
        title="User Page"
        body={<UserPage />}
        size="extra-wide"
        centered={false}
        onHide={() => {
          setShow(false);
        }}
      />
      <TextStyleExample />
      <TranslateExample />
      <BootstrapExample />
      <ButtonExample />
      <InputExample />
      <CardExample />
    </div>
  );
}

export default Main;
