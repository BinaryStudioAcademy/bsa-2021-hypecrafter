import { useState } from 'react';
import UserPage from '../../scenes/UserPage';
import BootstrapExample from '../BootstrapExample';
import ButtonExample from '../ButtonExample';
import CardExample from '../CardExample';
import Chart from '../Chart/Chart';
import defaultProps from '../Chart/testprops';
import ExampleCounter from '../Counter/ExampleCounter';
import Input from '../Input';
import InputExample from '../InputExample';
import ModalWindow from '../ModalWindow';
import PopoverExample from '../PopoverExample';
import SelectExample from '../SelectExample';
import TabsExample from '../TabsExample';
import TextStyleExample from '../TextStyleExample';
import TranslateExample from '../TranslateExample';

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
