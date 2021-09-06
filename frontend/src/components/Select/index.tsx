import { ChangeEvent, forwardRef } from 'react';
import { Form, FormGroupProps } from 'react-bootstrap';
import classes from './styles.module.scss';

interface Props extends FormGroupProps {
  label?: string;
  defaultText?: string;
  options: Array<{ text: string; value: string }>;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select = forwardRef<HTMLSelectElement, Props>(({
  label,
  defaultText,
  options,
  onChange,
  ...restFormGroupProps
}, ref) => (
  <Form.Group className={classes['select-container']}>
    {label && <Form.Label className={classes['select-label']}>{label}</Form.Label>}
    <Form.Control
      ref={ref}
      {...restFormGroupProps}
      className={classes['select-field']}
      onChange={onChange as any}
      as='select'
    >
      {defaultText && <option className={classes['select-option']} value="">{defaultText}</option>}
      {options.map((option) => (
        <option className={classes['select-option']} key={option.value} value={option.value}>{option.text}</option>
      ))}
    </Form.Control>
  </Form.Group>
));

export default Select;
