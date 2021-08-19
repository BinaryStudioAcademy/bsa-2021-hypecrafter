import { FC } from 'react';
import { FormLabel, InputGroup } from 'react-bootstrap';
import classes from './styles.module.scss';

interface Props{
  label: string,
  value: boolean,
  onChange: () => void,
  id:string
}

const Checkbox: FC<Props> = ({ label, value, onChange, id }) => (
  <InputGroup className={classes.checkbox}>
    <input
      id={id}
      type="checkbox"
      checked={value}
      onChange={onChange}
    />
    {label && <FormLabel htmlFor={id} className={classes.label}> {label} </FormLabel>}
  </InputGroup>
);
export default Checkbox;
