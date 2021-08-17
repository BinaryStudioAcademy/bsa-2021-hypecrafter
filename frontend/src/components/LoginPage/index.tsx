import { FC, MouseEventHandler } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import logo from '../../assets/HypeCrafter.svg';
import { Languages, Routes } from '../../common/enums';
import { useLocalization } from '../../providers/localization';
import Button from '../Button';
import Input from '../Input';
import classes from './styles.module.scss';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: FC = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>();
  const { t, changeLanguage, selectedLanguage } = useLocalization();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Sign In', data.email, data.password);

    setError('email', { // set error example
      type: 'manual',
      message: 'Dont Forget Your Username Should Be Cool!'
    });
  };

  const dummySignInWithGoogleHandler: MouseEventHandler<HTMLButtonElement> = () => {
    console.log('Sign In with Google');
    changeLanguage(selectedLanguage === Languages.UA ? Languages.EN : Languages.UA); // temp, for translations test
  };

  return (
    <div className={classes.root}>
      <div className={classes.hero}>
        <img className={classes.logo} src={logo} alt="logo" />
      </div>

      <div className={classes.content}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={classes.title}>{t('Sign In')}</h2>

          <div className={classes['register-cta']}>
            {t('Don’t have an account?')} <Link to={Routes.SIGNUP}>{t('Sign Up')}</Link>
          </div>
          <Input
            type="email"
            placeholder={t('Enter your email')}
            label={t('Email')}
            errorMessage={errors.email?.message}
            {...register('email', { required: true })}
          />

          <div className={classes['password-cta']}>
            <Link to={Routes.RESET_PASSWORD}>{t('Forgot your password?')}</Link>
          </div>
          <Input
            type="password"
            placeholder={t('Enter your password')}
            label={t('Password')}
            errorMessage={errors.password?.message}
            {...register('password', {
              required: true,
              minLength: {
                value: 6,
                message: t('Password is too short (minimum is 6 characters)')
              }
            })}
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
