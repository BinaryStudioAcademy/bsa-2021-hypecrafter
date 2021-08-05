import { useState } from 'react';
import { Container, Col } from 'react-bootstrap';
import Input from '../Input';

function InputExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');

  return (
    <Container>
      <Col lg="4">
        <Input type="text" value={text} placeholder="Search..." onChange={setText} />
        <Input
          type="email"
          value={email}
          placeholder="Enter your email"
          label="Email"
          onChange={setEmail}
          errorMessage="Error example."
        />
        <Input
          type="password"
          value={password}
          placeholder="Enter your password"
          label="Password"
          onChange={setPassword}
        />
      </Col>
    </Container>
  );
}

export default InputExample;
