import { Container } from 'react-bootstrap';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';
import ButtonExample from '../ButtonExample';
import InputExample from '../InputExample';

function Main() {
  return (
    <Container>
      <Users />
      <TranslateExample />
      <BootstrapExample />
      <ButtonExample />
      <InputExample />
    </Container>
  );
}

export default Main;
