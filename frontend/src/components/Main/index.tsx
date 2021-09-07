import { useState } from 'react';
import UserPage from '../../scenes/UserPage';
import Chart from '../Chart';
import defaultProps from '../Chart/utils';
import Chat from '../Chat';
import DatePickerInput from '../DatePicker';
import Input from '../Input';
import ModalWindow from '../ModalWindow';
import ProjectPrivilege from '../ProjectPrivilege';

function Main() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <div style={{ width: '100%', height: '600px' }}>...</div>
      <Chat nickName="dgorkavyi" />
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
      <DatePickerInput daySetter={(day) => console.log(day)} />
      <Chart
        type="line"
        labels={defaultProps.data.labels}
        dataSets={defaultProps.data.datasets}
      />
      <Input type="number" />
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
    </div>
  );
}

export default Main;
