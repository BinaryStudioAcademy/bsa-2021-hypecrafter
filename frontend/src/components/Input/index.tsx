import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { FormControl, FormControlProps, FormLabel, InputGroup } from 'react-bootstrap';
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
            <button
              type="button"
              className={classes['input-password-eye']}
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          ) }
      </div>
      <div className={classes['error-message-container']}>
        { errorMessage && <span className={classes['error-message']}> {errorMessage} </span> }
      </div>
    </InputGroup>
  );
};

export default Input;
