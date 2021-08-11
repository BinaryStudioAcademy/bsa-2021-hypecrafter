import { useState, forwardRef } from 'react';
import { InputGroup, FormControlProps, FormControl, FormLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import classes from './styles.module.scss';

interface Props extends FormControlProps {
  type?: 'text' | 'textarea' | 'email' | 'password'| 'search' | 'number';
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  step?: number;
}

const Input = forwardRef<HTMLInputElement, Props>(({
  type = 'text',
  placeholder = '',
  label,
  errorMessage,
  step = 2,
  ...restInputProps
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup className={classes['input-container']}>
      { label && <FormLabel htmlFor="input" className={classes['input-label']}> {label} </FormLabel> }
      <div className="input-field-container">
        <FormControl
          ref={ref}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          id="input"
          className={classes['input-field']}
          step={step}
          {...restInputProps}
        />
        {type === 'password'
          && (
            <button
              type="button"
              className={classes['input-password-eye']}
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          ) }
      </div>
      {type !== 'search' && (
      <div className={classes['error-message-container']}>
        {errorMessage && <span className={classes['error-message']}> {errorMessage} </span>}
      </div>
      )}
    </InputGroup>
  );
});

export default Input;
