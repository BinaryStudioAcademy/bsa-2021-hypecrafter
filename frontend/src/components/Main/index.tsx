import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';
import ButtonExample from '../ButtonExample';
import InputExample from '../InputExample';
import ModalWindow from '../ModalWindow';
import TabsExample from '../TabsExample';

function Main() {
  const [show, setShow] = useState(true);
  return (
    <Container>
      <TabsExample />
      <Users />
      <ModalWindow
        show={show}
        title="Modal"
        body="Hello there!"
        onHide={() => {
          setShow(false);
        }}
      />
      <TranslateExample />
      <BootstrapExample />
      <ButtonExample />
      <InputExample />
    </Container>
  );
}

export default Main;
