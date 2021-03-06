import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useState } from 'react';
import { FormControl, FormControlProps, FormLabel, InputGroup } from 'react-bootstrap';
import classes from './styles.module.scss';

interface Props extends FormControlProps {
  type?: 'text' | 'textarea' | 'email' | 'password' | 'search' | 'number';
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  step?: number;
  options?: Array<{ text: string; value: string }>;
  countOptions?:number;
  selectOption?: (value: string) => void,
  min?: number;
  max?: number;
  isAutoComplete?: boolean;
  isRequired?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>(({
  type = 'text',
  placeholder = '',
  label,
  errorMessage,
  step = 2,
  options,
  countOptions = 10,
  selectOption,
  max,
  min,
  isAutoComplete = false,
  isRequired = false,
  ...restInputProps
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputGroup className={classes['input-container']}>
      {label && (
        <FormLabel
          htmlFor="input"
          className={classes['input-label']}
        >
          {label}
          {isRequired && <span className={classes['input-label-required-mark']}>*</span> }
        </FormLabel>
      )}
      <div className="input-field-container">
        <FormControl
          ref={ref}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          id="input"
          className={classes['input-field']}
          as={type === 'textarea' ? 'textarea' : 'input'}
          step={step}
          min={min}
          max={max}
          autoComplete={isAutoComplete ? 'on' : 'off'}
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
          )}
        {options && (
        <div className={classes.options}>
          {options.slice(0, countOptions).map(option => (
            <button
              type="button"
              key={option.value}
              onClick={() => selectOption && selectOption(option.value)}
            >{option.text}
            </button>
          ))}
        </div>
        )}
      </div>
      {type !== 'search' && (
        <div className={classes['error-message-container']}>
          {errorMessage && <span className={classes['error-message']}> {errorMessage} </span>}
        </div>
      )}
    </InputGroup>
  );
});

Input.displayName = 'Input';

export default Input;
