import { Container } from 'react-bootstrap';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';
import ButtonExample from '../ButtonExample';

const Main = () => (
  <Container>
    <Users />
    <TranslateExample />
    <BootstrapExample />
    <ButtonExample />
  </Container>
);
export default Main;
