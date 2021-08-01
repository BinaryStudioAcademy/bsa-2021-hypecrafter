import { FC, FormEventHandler, MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import Input from '../Input';
import classes from './styles.module.scss';
import logo from '../../assets/HypeCrafter.svg';
import { Routes, Languages } from '../../common/enums';

const LoginPage: FC = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dummySignInHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('Sign In');
  };

  const dummySignInWithGoogleHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log('Sign In with Google');
    i18n.changeLanguage(i18n.language === Languages.UA ? Languages.EN : Languages.UA); // temp, for translations test
  };

  return (
    <div className={classes.root}>
      <div className={classes.hero}>
        <img className={classes.logo} src={logo} alt="logo" />
      </div>

      <div className={classes.content}>
        <form className={classes.form} onSubmit={dummySignInHandler}>
          <h2 className={classes.title}>{t('Sign In')}</h2>
          <div className={classes['register-cta']}>
            {t('Don’t have an account?')} <Link to={Routes.SIGNUP}>{t('Sign Up')}</Link>
          </div>

          <Input
            type="email"
            placeholder={t('Enter your email')}
            label={t('Email')}
            value={email}
            onChange={setEmail}
            errorMessage=""
          />

          <div className={classes['password-cta']}>
            <Link to={Routes.RESET_PASSWORD}>{t('Forgot your password?')}</Link>
          </div>
          <Input
            type="password"
            placeholder={t('Enter your password')}
            value={password}
            label={t('Password')}
            onChange={setPassword}
            errorMessage=""
          />

          <Button
            className={classes['sign-in-button']}
            type="submit"
          >
            {t('Sign In')}
          </Button>

          <div className={classes['horizontal-ruler-text']}><div>{t('or')}</div></div>
          <hr className={classes['horizontal-ruler']} />

          <Button
            className={classes['google-button']}
            onClick={dummySignInWithGoogleHandler}
          >
            {t('Sign In with Google')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
