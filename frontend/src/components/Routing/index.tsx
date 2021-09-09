import { useEffect, useState } from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import { Routes } from '../../common/enums';
import { getAccessToken } from '../../helpers/localStorage';
import { useAction, useAuth, useTypedSelector } from '../../hooks';
import LoginPage from '../../scenes/Auth/LoginPage';
import SignupPage from '../../scenes/Auth/SignupPage';
import CreateProject from '../../scenes/CreateProject';
import Donate from '../../scenes/Donate';
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
import MetaData from '../MetaData';
import ModalWindow from '../ModalWindow';
import PageNotFound from '../PageNotFound';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import UserModal from '../UserModal';

const routesWitoutHeader = [Routes.LOGIN, Routes.SIGNUP];

const Routing = () => {
  const { authFetchUserAction, closeModalAction, getNotificationsAction, hideDonateModalAction } = useAction();
  const { id } = useTypedSelector(({ userProfile }) => userProfile);
  const { donateState } = useTypedSelector(({ donate }) => donate);
  const { isLoading } = useTypedSelector(({ auth }) => auth);
  const tokens = getAccessToken();
  const { pathname } = useLocation();
  const { isAuthorized, id: currentUserId } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const closeModalHandler = () => {
    setShowModal(false);
    closeModalAction();
  };

  const closeDonateModalHandler = () => {
    hideDonateModalAction();
  };
  useEffect(() => {
    if (!isAuthorized && tokens) authFetchUserAction();
    if (id) setShowModal(true);
  }, [authFetchUserAction, id, isAuthorized, tokens]);

  useEffect(() => {
    if (isAuthorized) {
      getNotificationsAction(currentUserId as string);
    }
  }, [isAuthorized]);

  return (
    <>
      <MetaData />
      <LoaderWrapper isLoading={isLoading} variant="page">
        {!routesWitoutHeader.includes(pathname as Routes) && <Header />}
        <ModalWindow
          show={showModal}
          title="User Page"
          body={<UserPage />}
          size="extra-wide"
          centered={false}
          onHide={closeModalHandler}
        />
        <ModalWindow
          show={donateState !== 'hide'}
          title="Donate"
          body={<Donate type={donateState} />}
          size="medium"
          centered={false}
          onHide={closeDonateModalHandler}
        />
        <PublicRoute
          restricted={false}
          path={Routes.HOME}
          component={UserModal}
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
          <PrivateRoute
            exact
            path={Routes.PROJECTS_CREATE}
            component={CreateProject}
          />
          <PrivateRoute
            exact
            path={Routes.PROJECTS_EDIT + Routes.ID}
            component={CreateProject}
          />
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
          <Redirect from="*" to={Routes.NOTFOUND} />
        </Switch>
      </LoaderWrapper>
    </>
  );
};

export default Routing;
