import { forwardRef } from 'react';
import { Form } from 'react-bootstrap';
import Select, { Props as SelectProps } from 'react-select';
import classes from './styles.module.scss';
import './styles.scss';

interface Props extends Omit<SelectProps, 'options'> {
  label?: string;
}

const MultiSelect = forwardRef<HTMLInputElement, Props>(
  ({ label, options, onChange, ...restPros }, ref) => (
    <Form.Group className={classes['multiselect-container']}>
      {label && (
        <Form.Label className={classes['multiselect-label']}>
          {label}
        </Form.Label>
      )}
      <Select
        {...restPros}
        isMulti
        innerRef={ref}
        options={options}
        classNamePrefix="react-select"
        className="react-select-container"
        onChange={(items) => onChange(items)}
      />
    </Form.Group>
  )
);

export default MultiSelect;
