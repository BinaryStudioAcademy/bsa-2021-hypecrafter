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
import TextStyleExample from '../TextStyleExample';

function Main() {
  const [show, setShow] = useState(true);
  return (
    <Container>
      <Users />
      <PopoverExample />
      <ModalWindow
        show={show}
        title="Modal"
        body="Hello there!"
        size="medium"
        centered
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
    </Container>
  );
}

export default Main;
