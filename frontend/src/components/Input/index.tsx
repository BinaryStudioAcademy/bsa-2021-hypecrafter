import { useState, ChangeEvent, FunctionComponent } from 'react';
import { FormControlProps, FormControl, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import classes from './styles.module.scss'; // add base styles (border)

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
    <>
      { label ? <div className={classes.inputLabel}> {label} </div> : null }
      <InputGroup>
        <FormControl
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
          className={classes.formControl}
        />
        {type === 'password'
          ? (
            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </Button>
          )
          : null}
      </InputGroup>
      <div className={classes.errorMessageContainer}>
        { errorMessage ? <span className={classes.errorMessage}> {errorMessage} </span> : null }
      </div>
    </>
  );
};

export default Input;
