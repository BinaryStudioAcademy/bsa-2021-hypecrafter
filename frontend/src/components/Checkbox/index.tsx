import { FC } from 'react';
import classes from './styles.module.scss';

interface Props{
  label: string,
  value: boolean,
  onChange:()=>void
}

const Checkbox: FC<Props> = ({ label, value, onChange }) => (
  <label className={classes.checkbox}>
    <input
      type="checkbox"
      checked={value}
      onChange={onChange}
    />
    <label>{label}</label>
  </label>
);
export default Checkbox;
