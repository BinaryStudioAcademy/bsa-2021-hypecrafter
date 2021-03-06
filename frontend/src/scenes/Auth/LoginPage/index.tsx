import { FC, useEffect } from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login-typed';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import facebookIcon from '../../../assets/facebook-icons.png';
import googleIcon from '../../../assets/google-logo.png';
import logo from '../../../assets/HypeCrafter.svg';
import { Routes } from '../../../common/enums';
import { LoginData } from '../../../common/types/login';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Seo from '../../../components/Seo';
import { env } from '../../../env';
import { useAction, useTypedSelector } from '../../../hooks';
import { useLocalization } from '../../../providers/localization';
import classes from '../styles.module.scss';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: FC = () => {
  const history = useHistory();
  const { loginAction, facebookAuthAction, googleAuthAction } = useAction();

  const store = useTypedSelector(
    ({ authentication: { tokens, isLoading, error } }) => ({
      accessToken: tokens?.accessToken,
      refreshToken: tokens?.refreshToken,
      isLoading,
      error
    })
  );
  const { refreshToken, error } = store;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>();
  const { t } = useLocalization();

  const onSubmit: SubmitHandler<FormData> = (data: LoginData) => {
    loginAction(data);
  };

  const handleLoginWithFacebook = (data: ReactFacebookLoginInfo) => {
    const { accessToken } = data;
    facebookAuthAction(accessToken);
  };

  useEffect(() => {
    if (refreshToken) {
      history.push('/');
    }
  }, [refreshToken]);

  useEffect(() => {
    if (error) {
      setError('email', {
        type: 'manual',
        message: 'Email or password is invalid'
      });
    }
  }, [error]);

  const handleLoginWithGoogle = (googleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const token: string = (googleData as GoogleLoginResponse).tokenId;
    googleAuthAction(token);
  };

  return (
    <div className={classes.root}>
      <Seo
        title={`${t('Log In')} - HypeCrafter`}
        description=""
      />

      <div className={classes.hero}>
        <img className={classes.logo} src={logo} alt="logo" />
      </div>

      <div className={classes.content}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={classes.title}>{t('Log In')}</h2>

          <div className={classes['register-cta']}>
            {t('Don???t have an account?')}{' '}
            <Link to={Routes.SIGNUP}>{t('Sign Up')}</Link>
          </div>
          <Input
            type="email"
            placeholder={t('Enter your email')}
            label={t('Email')}
            errorMessage={errors.email?.message}
            isAutoComplete
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
            {t('Log In')}
          </Button>

          <div className={classes['horizontal-ruler-text']}>
            <div>{t('or')}</div>
          </div>
          <hr className={classes['horizontal-ruler']} />

          <div className={classes['social-media-auth-button-wrapper']}>
            <GoogleLogin
              render={(renderProps) => (
                <Button
                  icon={
                  (
                    <img
                      src={googleIcon}
                      alt="facebook"
                    />
                  )
                }
                  iconPosition='right'
                  onClick={renderProps.onClick}
                  className={classes['google-button']}
                >
                  Google
                </Button>
              )}
              clientId={env.auth.googleClientId as string}
              onSuccess={handleLoginWithGoogle}
              cookiePolicy="single_host_origin"
            />
            <FacebookLogin
              appId={env.auth.facebookClientId as string}
              callback={handleLoginWithFacebook}
              onFailure={() => {}}
              render={renderProps => (
                <Button
                  icon={
                    (
                      <img
                        src={facebookIcon}
                        alt="facebook"
                      />
                    )
                  }
                  iconPosition='right'
                  className={classes['google-button']}
                  onClick={renderProps.onClick}
                >
                  Facebook
                </Button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
