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
import { useLocalization } from '../../providers/localization';

interface MainFormProps {
  setIsMainForm: CallableFunction;
  setMainFormInfo: CallableFunction;
  mainFormInfo: MainFormData;
  t: CallableFunction;
}

type MainFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const MainForm: FunctionComponent<MainFormProps> = ({
  setIsMainForm, setMainFormInfo, mainFormInfo, t
}: MainFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MainFormData>();

  const onSubmit: SubmitHandler<MainFormData> = (data) => {
    setIsMainForm(false);
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
          onChange={event => handleChange('firstName', event.target.value)}
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
          onChange={event => handleChange('lastName', event.target.value)}
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
        onChange={event => handleChange('email', event.target.value)}
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
        onChange={event => handleChange('password', event.target.value)}
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

interface DetailFormProps {
  setIsMainForm: CallableFunction;
  mainFormInfo: MainFormData;
  t: CallableFunction;
}

type DetailFormData = {
  country?: string;
  phone?: string;
  gender?: string;
  birthday?: string;
};

const DetailForm: FunctionComponent<DetailFormProps> = ({
  setIsMainForm, mainFormInfo, t
}: DetailFormProps) => {
  const {
    register,
    handleSubmit
  } = useForm<DetailFormData>();

  const onSubmit: SubmitHandler<DetailFormData> = (data) => {
    setIsMainForm(false);
    console.log(
      'Sign Up',
      data.country,
      data.phone,
      data.gender,
      data.birthday,
      mainFormInfo.email,
      mainFormInfo.firstName,
      mainFormInfo.lastName,
      mainFormInfo.password
    );
  };

  const handleBackButtonClick = () => {
    setIsMainForm(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className={classes['select-form']}>
        <Form.Label>{t('Country')}</Form.Label>
        <Form.Select
          {...register('country', {
            required: false
          })}
        >
          <option value="">{t('Country (optional)')}</option>
          <option value="France">{t('France')}</option>
          <option value="Poland">{t('Poland')}</option>
          <option value="Switzerland">{t('Switzerland')}</option>
          <option value="UA">{t('Ukraine')}</option>
          <option value="GB">{t('United Kingdom')}</option>
        </Form.Select>
      </Form.Group>
      <Input
        type="text"
        placeholder={t('Phone (optional)')}
        label={t('Phone')}
        {...register('phone', {
          required: false,
          pattern: {
            value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
            message: t('Phone number is invalid')
          }
        })}
      />
      <Form.Group className={classes['select-form']}>
        <Form.Label>{t('Gender')}</Form.Label>
        <Form.Select
          {...register('gender', {
            required: false
          })}
        >
          <option value="">{t('Gender (optional)')}</option>
          <option value="male">{t('Male')}</option>
          <option value="female">{t('Female')}</option>
          <option value="other">{t('Other')}</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={classes['birth-form']}>
        <Form.Label>{t('Birthday')}</Form.Label>
        <br />
        <input
          className={classes['birth-input']}
          type="date"
          placeholder={t('Birthday')}
          {...register('birthday', {
            required: false
          })}
        />
      </Form.Group>
      <div className={classes['detail-form-control']}>
        <Button
          className={classes['sign-up-button']}
          type="button"
          onClick={handleBackButtonClick}
        >
          {t('Back')}
        </Button>
        <Button className={classes['sign-up-button']} type="submit">
          {t('Submit')}
        </Button>
      </div>
    </form>
  );
};

const SignupPage: FunctionComponent = (props) => {
  const [isMainForm, setIsMainForm] = useState(true);
  const [mainFormInfo, setMainFormInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { t } = useLocalization();

  return (
    <div className={classes.root}>
      <div className={classes.hero}>
        <img className={classes.logo} src={logo} alt="logo" />
      </div>
      <div className={classes.content}>
        <div className={classes.form}>
          <h2 className={classes.title}>{t('Sign In')}</h2>
          <div className={classes['form-titles-wrapper']}>
            <h4
              className={classNames(`${classes['form-title']}`, {
                [`${classes.chosen}`]: isMainForm
              })}
            >
              {t('Create account')}
            </h4>
            <h4
              className={classNames(`${classes['form-title']}`, {
                [`${classes.chosen}`]: !isMainForm
              })}
            >
              {t('Personal details')}
            </h4>
          </div>
          {isMainForm ? (
            <MainForm
              setIsMainForm={setIsMainForm}
              mainFormInfo={mainFormInfo}
              setMainFormInfo={setMainFormInfo}
              t={t}
            />
          ) : (
            <DetailForm
              setIsMainForm={setIsMainForm}
              mainFormInfo={mainFormInfo}
              t={t}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
