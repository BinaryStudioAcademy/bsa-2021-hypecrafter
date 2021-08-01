import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';
import ButtonExample from '../ButtonExample';
import InputExample from '../InputExample';
import CardExample from '../CardExample';
import ModalWindow from '../ModalWindow';

function Main() {
  const [show, setShow] = useState(true);
  return (
    <Container>
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
      <CardExample />
    </Container>
  );
}

export default Main;
