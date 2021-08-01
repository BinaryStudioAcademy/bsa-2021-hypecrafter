import { FC, FormEventHandler, MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Input from '../Input';
import classes from './styles.module.scss';
import logo from '../../assets/HypeCrafter.svg';
import { Routes } from '../../common/enums';

const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dummySignInHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('Sign In');
  };

  const dummySignInWithGoogleHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log('Sign In with Google');
  };

  return (
    <div className={classes.root}>
      <div className={classes.hero}>
        <img className={classes.logo} src={logo} alt="logo" />
      </div>

      <div className={classes.content}>
        <form className={classes.form} onSubmit={dummySignInHandler}>
          <h2 className={classes.title}>Sign In</h2>
          <div className={classes['register-cta']}>
            Don’t have an account? <Link to={Routes.SIGNUP}>Sign Up</Link>
          </div>

          <Input
            type="email"
            placeholder="Enter your email"
            label="Email"
            value={email}
            onChange={setEmail}
            errorMessage=""
          />

          <div className={classes['password-cta']}>
            <Link to={Routes.RESET_PASSWORD}>Forgot your password?</Link>
          </div>
          <Input
            type="password"
            placeholder="......."
            value={password}
            label="Password"
            onChange={setPassword}
            errorMessage=""
          />

          <Button
            className={classes['sign-in-button']}
            type="submit"
          >
            Sign In
          </Button>
          <hr className={classes['horizontal-ruler']} />
          <Button
            className={classes['google-button']}
            onClick={dummySignInWithGoogleHandler}
          >
            Sign In with Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
