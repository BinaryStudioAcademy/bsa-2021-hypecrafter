import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';
import ButtonExample from '../ButtonExample';
import InputExample from '../InputExample';
import PopoverExample from '../PopoverExample';
import CardExample from '../CardExample';
import ModalWindow from '../ModalWindow';
import UserPage from '../../scenes/UserPage';
import Chart from '../Chart/Chart';
import defaultProps from '../Chart/testprops';

function Main() {
  const [show, setShow] = useState(true);
  return (
    <Container>
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
        size="user-page"
        centered={false}
        onHide={() => {
          setShow(false);
        }}
      />
      <TranslateExample />
      <BootstrapExample />
      <ButtonExample />
      <InputExample />
      <CardExample />
    </Container>
  );
}

export default Main;
