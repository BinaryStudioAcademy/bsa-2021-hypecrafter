import { Container, Col } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select from '../Select';

interface FormData {
  Selector1: string;
  Selector2: string;
}

const SelectExample = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Sign In', data);
  };

  return (
    <Container>
      <Col md="4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            label="Label"
            defaultText="Title"
            options={[
              { value: '1', text: 'sss' },
              { value: '2', text: 'ppp' }
            ]}
            {...register('Selector1', { required: true })}
          />
          <Select
            options={[
              { value: '11', text: 'aaaa' },
              { value: '22', text: 'bbbb' }
            ]}
            {...register('Selector2', { required: true })}
          />
          <button type="submit">Submit</button>
        </form>
      </Col>
    </Container>
  );
};

export default SelectExample;
