import { forwardRef } from 'react';
import { Form, FormGroupProps } from 'react-bootstrap';
import classes from './styles.module.scss';

interface Props extends FormGroupProps {
  label?: string;
  defaultText?: string;
  options: Array<{ text: string; value: string }>;
}

const Select = forwardRef<HTMLSelectElement, Props>(({
  label,
  defaultText,
  options,
  ...restFormGroupProps
}, ref) => (
  <Form.Group className={classes['select-container']}>
    {label && <Form.Label className={classes['select-label']}>{label}</Form.Label>}
    <Form.Select ref={ref} {...restFormGroupProps} className={classes['select-field']}>
      {defaultText && <option className={classes['select-option']} value="">{defaultText}</option>}
      {options.map((option, i) => (
        <option className={classes['select-option']} key={option.value} value={option.value}>{option.text}</option>
      ))}
    </Form.Select>
  </Form.Group>
));

export default Select;