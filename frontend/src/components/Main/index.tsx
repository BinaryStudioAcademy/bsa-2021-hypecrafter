import { useState } from 'react';
import UserPage from '../../scenes/UserPage';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import ButtonExample from '../ButtonExample';
import CardExample from '../CardExample';
import Chart from '../Chart/Chart';
import defaultProps from '../Chart/testprops';
import SelectExample from '../SelectExample';
import ExampleCounter from '../Counter/ExampleCounter';
import InputExample from '../InputExample';
import ModalWindow from '../ModalWindow';
import PopoverExample from '../PopoverExample';
import TabsExample from '../TabsExample';
import TextStyleExample from '../TextStyleExample';
import TranslateExample from '../TranslateExample';
import Input from '../Input';

function Main() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <Input type="number" />
      <ExampleCounter />
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
      <SelectExample />
    </div>
  );
}

export default Main;
