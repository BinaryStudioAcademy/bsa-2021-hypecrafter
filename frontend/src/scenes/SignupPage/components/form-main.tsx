import { FunctionComponent, MouseEventHandler } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Routes } from '../../../common/enums';
import classes from '../styles.module.scss';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Pages } from '../../../common/enums/signupForms';

export type MainFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface MainFormProps {
  setCurrentPage: CallableFunction;
  setMainFormInfo: CallableFunction;
  mainFormInfo: MainFormData;
  t: CallableFunction;
}

const MainForm: FunctionComponent<MainFormProps> = ({
  setCurrentPage,
  setMainFormInfo,
  mainFormInfo,
  t
}: MainFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MainFormData>();

  const onSubmit: SubmitHandler<MainFormData> = (data) => {
    setCurrentPage(Pages.ADDITIONAL_FORM);
    console.log(
      'Sign Un',
      data.email,
      data.password,
      data.firstName,
      data.lastName
    );
  };

  const dummySignUpWithGoogleHandler: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    console.log('Sign Up with Google');
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
        <Link to={Routes.SIGNUP}>{t('Privacy Policy')}</Link> and{' '}
        <Link to={Routes.SIGNUP}>{t('Terms of use')}</Link>
      </div>
      <div className={classes['horizontal-ruler-text']}>
        <div>{t('or')}</div>
      </div>
      <hr className={classes['horizontal-ruler']} />
      <Button
        className={classes['google-button']}
        onClick={dummySignUpWithGoogleHandler}
      >
        {t('Sign Up with Google')}
      </Button>
    </form>
  );
};

export default MainForm;
