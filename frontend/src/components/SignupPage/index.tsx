import { FunctionComponent, useState, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import classes from './styles.module.scss';
import logo from '../../assets/HypeCrafter.svg';
import Input from '../Input';
import Button from '../Button';
import { Routes } from '../../common/enums';

interface MainFormProps {
  setIsMainForm: CallableFunction;
}

type MainFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const MainForm: FunctionComponent<MainFormProps> = ({
  setIsMainForm
}: MainFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<MainFormData>();

  const onSubmit: SubmitHandler<MainFormData> = (data) => {
    setIsMainForm(false);
    console.log(
      'Sign In',
      data.email,
      data.password,
      data.firstName,
      data.lastName
    );

    /*
    setError('email', { // set error example
      type: 'manual',
      message: 'Dont Forget Your Username Should Be Cool!'
    });
    */
  };

  const dummySignUpWithGoogleHandler: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    console.log('Sign Up with Google');
    // changeLanguage(selectedLanguage === Languages.UA ? Languages.EN : Languages.UA); // temp, for translations test
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes['name-wrapper']}>
        <Input
          type="text"
          placeholder="Enter your first name"
          label="First name"
          errorMessage={errors.firstName?.message}
          {...register('firstName', {
            required: true,
            minLength: {
              value: 2,
              message: 'First name is too short'
            }
          })}
        />
        <Input
          type="text"
          placeholder="Enter your last name"
          label="Last name"
          errorMessage={errors.lastName?.message}
          {...register('lastName', {
            required: true,
            minLength: {
              value: 2,
              message: 'Last name is too short'
            }
          })}
        />
      </div>
      <Input
        type="email"
        placeholder="Enter your email"
        label="Email"
        errorMessage={errors.email?.message}
        {...register('email', {
          required: true,
          pattern: /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/
        })}
      />
      <Input
        type="password"
        placeholder="Enter your password"
        label="Password"
        errorMessage={errors.password?.message}
        {...register('password', {
          required: true,
          minLength: {
            value: 6,
            message: 'Password is too short (minimum is 6 characters)'
          }
        })}
      />
      <Button className={classes['sign-up-button']} type="submit">
        Sign Up
      </Button>
      <div className={classes['register-cta']}>
        By signing up, you agree to our{' '}
        <Link to={Routes.SIGNUP}>Privacy Policy</Link> and{' '}
        <Link to={Routes.SIGNUP}>Terms of use</Link>
      </div>
      <div className={classes['horizontal-ruler-text']}>
        <div>or</div>
      </div>
      <hr className={classes['horizontal-ruler']} />
      <Button
        className={classes['google-button']}
        onClick={dummySignUpWithGoogleHandler}
      >
        Sign Up with Google
      </Button>
    </form>
  );
};

type DetailFormData = {
  country: string;
  phone: string;
  gender: string;
  birthday: string;
};

const DetailForm: FunctionComponent<MainFormProps> = ({
  setIsMainForm
}: MainFormProps) => {
  const handleBackButtonClick = () => {
    setIsMainForm(true);
  };
  return (
    <div>
      <Input type="text" placeholder="Country (optional)" label="Country" />
      <Input type="text" placeholder="Phone (optional)" label="Phone" />
      <Form.Group className={classes['gender-form']}>
        <Form.Label>Gender</Form.Label>
        <Form.Select aria-label="Floating label select example">
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Other</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={classes['birth-form']}>
        <Form.Label>Birthday</Form.Label>
        <br />
        <input
          className={classes['birth-input']}
          type="date"
          placeholder="Birthday"
        />
      </Form.Group>
      <div className={classes['detail-form-control']}>
        <Button
          className={classes['sign-up-button']}
          type="submit"
          onClick={handleBackButtonClick}
        >
          Back
        </Button>
        <Button className={classes['sign-up-button']} type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
};

const SignupPage: FunctionComponent = (props) => {
  const [isMainForm, setIsMainForm] = useState(true);

  return (
    <div className={classes.root}>
      <div className={classes.hero}>
        <img className={classes.logo} src={logo} alt="logo" />
      </div>
      <div className={classes.content}>
        <div className={classes.form}>
          <h2 className={classes.title}>Sign Up</h2>
          <div className={classes['form-titles-wrapper']}>
            <h4
              className={classNames(`${classes['form-title']}`, {
                [`${classes.chosen}`]: isMainForm
              })}
            >
              Create account
            </h4>
            <h4
              className={classNames(`${classes['form-title']}`, {
                [`${classes.chosen}`]: !isMainForm
              })}
            >
              Personal details
            </h4>
          </div>
          {isMainForm ? (
            <MainForm setIsMainForm={setIsMainForm} />
          ) : (
            <DetailForm setIsMainForm={setIsMainForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
