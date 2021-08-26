import { FunctionComponent } from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login-typed';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Routes } from '../../../../common/enums';
import { Pages } from '../../../../common/enums/signupForms';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { env } from '../../../../env';
import classesAuth from '../../styles.module.scss';
import classes from '../styles.module.scss';

export type MainFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface MainFormProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<Pages>>;
  setMainFormInfo: React.Dispatch<React.SetStateAction<MainFormData>>;
  mainFormInfo: MainFormData;
  t: CallableFunction;
  onSignupWithFacebook: (data: ReactFacebookLoginInfo) => void;
  onSignupWithGoogle: (data: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
}

const MainForm: FunctionComponent<MainFormProps> = ({
  setCurrentPage,
  setMainFormInfo,
  mainFormInfo,
  t,
  onSignupWithFacebook,
  onSignupWithGoogle
}: MainFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MainFormData>();

  const onSubmit: SubmitHandler<MainFormData> = () => {
    setCurrentPage(Pages.ADDITIONAL_FORM);
  };

  const handleChange = (field: string, value: string) => {
    setMainFormInfo({ ...mainFormInfo, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes['name-wrapper']}>
        <Input
          type="text"
          placeholder={t('Enter your first name')}
          label={t('First name')}
          value={mainFormInfo.firstName}
          errorMessage={errors.firstName?.message}
          {...register('firstName', {
            required: true,
            minLength: {
              value: 2,
              message: t('First name is too short')
            }
          })}
          onChange={(event) => handleChange('firstName', event.target.value)}
        />
        <Input
          type="text"
          placeholder={t('Enter your last name')}
          label={t('Last name')}
          errorMessage={errors.lastName?.message}
          value={mainFormInfo.lastName}
          {...register('lastName', {
            required: true,
            minLength: {
              value: 2,
              message: t('Last name is too short')
            }
          })}
          onChange={(event) => handleChange('lastName', event.target.value)}
        />
      </div>
      <Input
        type="email"
        placeholder={t('Enter your email')}
        label={t('Email')}
        errorMessage={errors.email?.message}
        value={mainFormInfo.email}
        {...register('email', {
          required: true
        })}
        onChange={(event) => handleChange('email', event.target.value)}
      />
      <Input
        type="password"
        placeholder={t('Enter your password')}
        label={t('Password')}
        errorMessage={errors.password?.message}
        value={mainFormInfo.password}
        {...register('password', {
          required: true,
          minLength: {
            value: 6,
            message: t('Password is too short (minimum is 6 characters)')
          }
        })}
        onChange={(event) => handleChange('password', event.target.value)}
      />
      <Button className={classes['sign-up-button']} type="submit">
        {t('Sign Up')}
      </Button>
      <div className={classes['register-cta']}>
        {t('By signing up, you agree to our')}{' '}
        <Link to={Routes.SIGNUP}>{t('Privacy Policy')}</Link> {t('and')}{' '}
        <Link to={Routes.SIGNUP}>{t('Terms of use')}</Link>
      </div>
      <div className={classesAuth['horizontal-ruler-text']}>
        <div>{t('or')}</div>
      </div>
      <hr className={classesAuth['horizontal-ruler']} />
      <GoogleLogin
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            className={classesAuth['google-button']}
          >
            {t('Sign Up with Google')}
          </Button>
        )}
        clientId={env.auth.googleClientId as string}
        onSuccess={onSignupWithGoogle}
        cookiePolicy="single_host_origin"
      />
      <FacebookLogin
        appId={env.auth.facebookClientId as string}
        callback={onSignupWithFacebook}
        onFailure={() => {}}
        render={renderProps => (
          <Button
            className={classesAuth['google-button']}
            onClick={renderProps.onClick}
          >
            {t('Sign Up with Facebook')}
          </Button>
        )}
      />
    </form>
  );
};

export default MainForm;
