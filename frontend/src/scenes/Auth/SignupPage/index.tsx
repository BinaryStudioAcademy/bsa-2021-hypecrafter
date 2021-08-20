import classNames from 'classnames';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../../assets/HypeCrafter.svg';
import { Routes } from '../../../common/enums';
import { Pages } from '../../../common/enums/signupForms';
import { SignupData } from '../../../common/types/signup';
import { useAction, useTypedSelector } from '../../../hooks';
import { useLocalization } from '../../../providers/localization';
import classesAuth from '../styles.module.scss';
import AdditionalForm from './components/form-additional';
import MainForm from './components/form-main';
import classes from './styles.module.scss';

const SignupPage: FunctionComponent = () => {
  const history = useHistory();
  const { registerUserAction, googleAuthAction } = useAction();
  const store = useTypedSelector(({ authentication: { tokens, isLoading, error } }) => ({
    accessToken: tokens?.accessToken,
    refreshToken: tokens?.refreshToken,
    isLoading,
    error
  }));
  const { refreshToken } = store;

  useEffect(() => {
    if (refreshToken) {
      history.push('/');
    }
  }, [refreshToken]);

  const handleSignup = (data: SignupData) => {
    registerUserAction(data);
  };

  const handleSignupWithGoogle = () => {
    googleAuthAction();
  };

  const [currentPage, setCurrentPage] = useState(Pages.MAIN_FORM);
  const [mainFormInfo, setMainFormInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { t } = useLocalization();

  const pages = {
    [Pages.MAIN_FORM]: (
      <MainForm
        setCurrentPage={setCurrentPage}
        mainFormInfo={mainFormInfo}
        setMainFormInfo={setMainFormInfo}
        onSignupWithGoogle={handleSignupWithGoogle}
        t={t}
      />
    ),
    [Pages.ADDITIONAL_FORM]: (
      <AdditionalForm
        setCurrentPage={setCurrentPage}
        mainFormInfo={mainFormInfo}
        t={t}
        onSignup={handleSignup}
      />
    )
  };

  return (
    <div className={classesAuth.root}>
      <div className={classesAuth.hero}>
        <img className={classesAuth.logo} src={logo} alt="logo" />
      </div>
      <div className={classesAuth.content}>
        <div className={classesAuth.form}>
          <h2 className={classesAuth.title}>{t('Sign Up')}</h2>
          <div className={classes['register-cta']}>
            {t('Have an account?')}{' '}
            <Link to={Routes.LOGIN}>{t('Log in')}</Link>
          </div>
          <div className={classes['form-titles-wrapper']}>
            <h4
              className={classNames(`${classes['form-title']}`, {
                [`${classes.chosen}`]: currentPage === Pages.MAIN_FORM
              })}
            >
              {t('Create account')}
            </h4>
            <h4
              className={classNames(`${classes['form-title']}`, {
                [`${classes.chosen}`]: currentPage === Pages.ADDITIONAL_FORM
              })}
            >
              {t('Personal details')}
            </h4>
          </div>
          {pages[currentPage]}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
