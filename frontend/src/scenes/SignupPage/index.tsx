import classNames from 'classnames';
import { FunctionComponent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/HypeCrafter.svg';
import { Pages } from '../../common/enums/signupForms';
import { SignupData } from '../../common/types/signup';
import { useAction, useTypedSelector } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import AdditionalForm from './components/form-additional';
import MainForm from './components/form-main';
import classes from './styles.module.scss';

const SignupPage: FunctionComponent = () => {
  const history = useHistory();
  const { registerUserAction } = useAction();
  const store = useTypedSelector(({ registration: { tokens, isLoading, error } }) => ({
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
