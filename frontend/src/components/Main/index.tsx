import { useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import Input from '../Input';
import TranslateExample from '../TranslateExample';

const Main = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');

  return (
    <Container>
      <Users />
      <TranslateExample />
      <BootstrapExample />
      <Container>
        <Col md="4">
          <Input type="text" value={text} placeholder="Search..." onChange={setText} />
          <Input
            type="email"
            value={email}
            placeholder="Enter your email"
            label="Email:"
            onChange={setEmail}
            errorMessage="Error expample."
          />
          <Input
            type="password"
            value={password}
            placeholder="Enter your password"
            label="Password:"
            onChange={setPassword}
          />
        </Col>
      </Container>
    </Container>
  );
};

export default Main;
