import { useState } from 'react';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';
import ButtonExample from '../ButtonExample';
import InputExample from '../InputExample';
import PopoverExample from '../PopoverExample';
import CardExample from '../CardExample';
import ModalWindow from '../ModalWindow';
import Header from '../Header';

function Main() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Header />
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
      <TranslateExample />
      <BootstrapExample />
      <ButtonExample />
      <InputExample />
      <CardExample />
    </div>
  );
}

export default Main;
