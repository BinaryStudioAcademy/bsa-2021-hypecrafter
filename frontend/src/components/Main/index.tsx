import { useState } from 'react';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';
import ButtonExample from '../ButtonExample';
import InputExample from '../InputExample';
import ModalWindow from '../ModalWindow';
import Header from '../Header';

function Main() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Header />
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
    </div>
  );
}

export default Main;
