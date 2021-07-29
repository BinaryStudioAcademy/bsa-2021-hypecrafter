import { useState, ChangeEvent, FunctionComponent } from 'react';
import { InputGroup, FormControlProps, FormControl, FormLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import classes from './styles.module.scss';

interface Props extends Omit<FormControlProps, 'onChange'> {
  value: string;
  type?: 'text' | 'textarea' | 'email' | 'password';
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  onChange: (value: string) => void;
}

const Input: FunctionComponent<Props> = ({
  type = 'text',
  value,
  placeholder = '',
  label,
  errorMessage,
  onChange
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <InputGroup className={classes['input-container']}>
      { label && <FormLabel htmlFor="input" className={classes['input-label']}> {label} </FormLabel> }
      <div className="input-field-container">
        <FormControl
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
          id="input"
          className={classes['input-field']}
        />
        {type === 'password'
          && (
            // eslint-disable-next-line jsx-a11y/interactive-supports-focus
            <span
              onClick={() => setShowPassword(!showPassword)}
              onKeyDown={() => setShowPassword(!showPassword)}
              role="button"
              className={classes['input-password-eye']}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          ) }
      </div>
      <div className={classes['error-message-container']}>
        { errorMessage && <span className={classes['error-message']}> {errorMessage} </span> }
      </div>
    </InputGroup>
  );
};

export default Input;
