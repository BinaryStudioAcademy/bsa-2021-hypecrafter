import { Container } from 'react-bootstrap';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';
import ButtonExample from '../ButtonExample';
import InputExample from '../InputExample';
import ChartExample from '../Chart/Chart';

function Main() {
  return (
    <Container>
      <ChartExample type="line" />
      <Users />
      <TranslateExample />
      <BootstrapExample />
      <ButtonExample />
      <InputExample />
    </Container>
  );
}

export default Main;
