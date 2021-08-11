import { useState } from 'react';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';
import ButtonExample from '../ButtonExample';
import InputExample from '../InputExample';
import PopoverExample from '../PopoverExample';
import CardExample from '../CardExample';
import ModalWindow from '../ModalWindow';
import UserPage from '../../scenes/UserPage';
import TextStyleExample from '../TextStyleExample';
import TabsExample from '../TabsExample';
import Chart from '../Chart';
import defaultProps from '../Chart/utils';
import SelectExample from '../SelectExample';
import ExampleCounter from '../Counter/ExampleCounter';
import Input from '../Input';

function Main() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Input type="number" />
      <ExampleCounter />
      <TabsExample />
      <Chart
        type="line"
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
