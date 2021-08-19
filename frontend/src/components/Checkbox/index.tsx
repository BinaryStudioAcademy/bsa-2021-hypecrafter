import { FC } from 'react';
import { FormLabel, InputGroup } from 'react-bootstrap';
import classes from './styles.module.scss';

interface Props{
  label: string,
  value: boolean,
  onChange:()=>void
}

const Checkbox: FC<Props> = ({ label, value, onChange }) => (
  <InputGroup className={classes.checkbox}>
    <input
      id="checkbox"
      type="checkbox"
      checked={value}
      onChange={onChange}
    />
    {label && <FormLabel htmlFor="chackbox" className={classes.label}> {label} </FormLabel>}
  </InputGroup>
);
export default Checkbox;
