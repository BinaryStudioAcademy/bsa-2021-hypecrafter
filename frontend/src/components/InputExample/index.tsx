import { Container, Col } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input';

interface FormData {
  email: string;
  password: string;
  text: string;
}

function InputExample() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log('Sign In', data);
  };

  return (
    <Container>
      <Col md="4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Search..." {...register('email')} />
          <Input
            type="email"
            placeholder="Enter your email"
            label="Email"
            errorMessage="Error example."
            {...register('email', { required: true })}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            label="Password"
            {...register('email', { required: true })}
          />
        </form>
      </Col>
    </Container>
  );
}

export default InputExample;
