import { useState } from 'react';
import UserPage from '../../scenes/UserPage';
import BootstrapExample from '../BootstrapExample';
import ButtonExample from '../ButtonExample';
import CardExample from '../CardExample';
import Chart from '../Chart';
import defaultProps from '../Chart/utils';
import ExampleCounter from '../Counter/ExampleCounter';
import Input from '../Input';
import InputExample from '../InputExample';
import ModalWindow from '../ModalWindow';
import PopoverExample from '../PopoverExample';
import ProjectPrivilege from '../ProjectPrivilege';
import SelectExample from '../SelectExample';
import TabsExample from '../TabsExample';
import TextStyleExample from '../TextStyleExample';
import TranslateExample from '../TranslateExample';

function Main() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <ProjectPrivilege
        value={20}
        title="I am a title!"
        content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
              occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
              mollit anim id est laborum.`}
        backers={13}
        includes={[
          'mmodo consequat. Duis ',
          'Lingua latina',
          'non verpa canis est'
        ]}
      />
      <Input type="number" />
      <ExampleCounter />
      <TabsExample />
      <Chart
        type="line"
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
