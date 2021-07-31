import { Container } from 'react-bootstrap';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';
import ButtonExample from '../ButtonExample';
import InputExample from '../InputExample';
import PopoverExample from '../PopoverExample';

function Main() {
  return (
    <Container>
      <Users />
      <TranslateExample />
      <BootstrapExample />
      <ButtonExample />
      <InputExample />
      <PopoverExample />
    </Container>
  );
}

export default Main;
