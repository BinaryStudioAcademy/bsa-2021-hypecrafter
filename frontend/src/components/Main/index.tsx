import { Container } from 'react-bootstrap';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';

const Main = () => (
  <Container>
    <Users />
    <TranslateExample />
    <BootstrapExample />
  </Container>
);
export default Main;
