import { useEffect, useState } from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import { Routes } from '../../common/enums';
import { getAccessToken } from '../../helpers/localStorage';
import { useAction, useTypedSelector } from '../../hooks';
import LoginPage from '../../scenes/Auth/LoginPage';
import SignupPage from '../../scenes/Auth/SignupPage';
import MainPage from '../../scenes/MainPage';
import ProjectPage from '../../scenes/ProjectPage';
import Projects from '../../scenes/Projects';
import TrendsPage from '../../scenes/TrendsPage';
import UserPage from '../../scenes/UserPage';
import FundsPage from '../../scenes/Wallet/FundsPage';
import Payment from '../../scenes/Wallet/Payment';
import SuccessPage from '../../scenes/Wallet/Payment/components/SuccessPage';
import Transactions from '../../scenes/Wallet/Transactions';
import Header from '../Header';
import LoaderWrapper from '../LoaderWrapper';
import Main from '../Main';
import ModalWindow from '../ModalWindow';
import PageNotFound from '../PageNotFound';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

const routesWitoutHeader = [Routes.LOGIN, Routes.SIGNUP];

const Routing = () => {
  const { authFetchUserAction, closeModalAction } = useAction();
  const authStore = useTypedSelector(({ auth: { user, isLoading } }) => ({
    user,
    isLoading
  }));
  const userProfileStore = useTypedSelector(({ userProfile: { id } }) => ({
    id
  }));
  const { pathname } = useLocation();
  const { user, isLoading } = authStore;
  const { id } = userProfileStore;
  const hasToken = Boolean(getAccessToken());
  const [showModal, setShowModal] = useState(false);

  const closeModalHandler = () => {
    setShowModal(false);
    closeModalAction();
  };

  useEffect(() => {
    if (hasToken) {
      authFetchUserAction();
      if (id !== '') {
        setShowModal(true);
      }
    }
  }, [authFetchUserAction, id]);

  return (
    <LoaderWrapper isLoading={isLoading || (!user && hasToken)} variant="page">
      {!routesWitoutHeader.includes(pathname as Routes) && <Header />}
      <ModalWindow
        show={showModal}
        title="User Page"
        body={<UserPage />}
        size="extra-wide"
        centered={false}
        onHide={closeModalHandler}
      />
      <Switch>
        <PublicRoute
          restricted={false}
          path={Routes.HOME}
          exact
          component={MainPage}
        />
        <PublicRoute
          restricted={false}
          path={Routes.LOGIN}
          exact
          component={LoginPage}
        />
        <PublicRoute
          restricted={false}
          path={Routes.SIGNUP}
          exact
          component={SignupPage}
        />
        <PublicRoute
          restricted={false}
          path={Routes.PROJECTS}
          exact
          component={Projects}
        />
        <PrivateRoute exact path={Routes.ADDFUNDS} component={FundsPage} />
        <PrivateRoute exact path={Routes.TRANSACTIONS} component={Transactions} />
        <PrivateRoute exact path={Routes.PAYMENT} component={Payment} />
        <PrivateRoute exact path={Routes.PAYMENT_SUCCESS} component={SuccessPage} />
        <PublicRoute
          restricted={false}
          path={Routes.TRENDS}
          exact
          component={TrendsPage}
        />
        <PublicRoute
          restricted={false}
          path={Routes.PROJECTS + Routes.ID}
          exact
          component={ProjectPage}
        />
        <PublicRoute
          restricted={false}
          path={Routes.NOTFOUND}
          exact
          component={PageNotFound}
        />
        <PublicRoute
          restricted={false}
          path={Routes.EXAMPLES}
          exact
          component={Main}
        />
        <Redirect from="*" to={Routes.NOTFOUND} />
      </Switch>
    </LoaderWrapper>
  );
};

export default Routing;
