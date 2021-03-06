import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import hypeCoin from '../../assets/HypeCoin.png';
import { Routes, SocketActions } from '../../common/enums';
import { NotificationType } from '../../common/types';
import { logout } from '../../helpers/http';
import { useAction, useAuth, useBalance, useDebounce, useScroll, useTypedSelector, useWindowResize } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import { useSockets } from '../../providers/sockets';
import Avatar from '../Avatar';
import Button from '../Button';
import Input from '../Input';
import Link from '../Link';
import Logo from '../Logo';
import NotificationPopover from '../NotificationsPopover';
import OpenUserModal from '../OpenUserModalOption';
import Popover from '../Popover';
import SearchResult from '../SearchResult';
import LanguageSwitcher from '../SwitchLanguageOption/LanguageSwitcher';
import classes from './styles.module.scss';
import { getLinks } from './utils';

const SEARCHBAR_DEBOUNCE_TIMEOUT = 500;
const OFFSET = 30;

const Header = () => {
  const [text, setText] = useState('');
  const [isMobileMenu, setMobileMenu] = useState(false);
  const [isProjectsMenu, setProjectsMenu] = useState(false);
  const [isProfileMenu, setProfileMenu] = useState(false);
  const [isVisibleOnScroll, setVisibleOnScroll] = useState(false);
  const { pathname } = useLocation();

  const { t } = useLocalization();
  const { addSocketHandler, socket } = useSockets();
  const { setNewNotificationsAction, searchAction } = useAction();
  const { isAuthorized } = useAuth();

  useEffect(() => {
    if (socket) {
      addSocketHandler(SocketActions.NOTIFICATION, (notification: NotificationType) => {
        setNewNotificationsAction(notification);
      });
    }
  }, [socket]);

  const { isMobile } = useWindowResize();
  const store = useTypedSelector(({ search: { searchResult, isLoading }, notifications: { notifications } }) => ({
    searchResult,
    isLoading,
    notifications
  }));
  const { firstName, lastName } = useTypedSelector(({ auth }) => (
    !auth?.user
      ? {
        firstName: '',
        lastName: ''
      }
      : auth.user
  ));
  const { searchResult, notifications } = store;
  const { isBalance, balance } = useBalance();

  const navLinks = useMemo(() => getLinks(t), [t]);

  const debouncedSearchTerm = useDebounce(text, SEARCHBAR_DEBOUNCE_TIMEOUT);

  const scrollOverLimitCallback = () => setVisibleOnScroll(false);
  const scrollUnderLimitCallback = () => setVisibleOnScroll(true);

  useScroll(OFFSET, { scrollOverLimitCallback, scrollUnderLimitCallback });

  const handleHideProfileMenu = () => {
    setProfileMenu(false);
    setMobileMenu(false);
  };

  const handleProfileMenu = () => {
    if (!isProfileMenu) {
      setMobileMenu(false);
      setProjectsMenu(false);
    }

    setProfileMenu(!isProfileMenu);
  };

  const handleMenuForMobile = () => {
    if (isMobileMenu && isProjectsMenu) {
      setProjectsMenu(false);
    }

    if (!isMobileMenu) {
      setProfileMenu(false);
    }

    setMobileMenu(!isMobileMenu);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        searchAction(text);
      }
    },
    [debouncedSearchTerm]
  );

  useEffect(() => {
    if (socket) {
      addSocketHandler(SocketActions.NOTIFICATION, (notification) => {
        setNewNotificationsAction(notification);
      });
    }
  }, [socket]);

  return (
    <div
      className={isVisibleOnScroll ? classes.visible_on_scroll : ''}
    >
      <div
        className={`
          ${classes.header}
          ${isMobile ? classes.hide : classes.desktop_visible}
        `}
      >
        <div className={classes.header_left}>
          <Link
            to={Routes.HOME}
            onClick={handleHideProfileMenu}
          >
            <Logo />
          </Link>
          <Nav
            className={classes.desktop_header_menu}
          >
            {navLinks.map(it => (
              <NavLink
                key={it.to}
                to={it.to}
                className={classNames(it.className, {
                  [classes.header_menu_item_active]: `/${pathname.split('/')[1]}` === it.to
                })}
                onClick={handleHideProfileMenu}
              >
                {it.label}
              </NavLink>
            ))}
          </Nav>
        </div>
        <div className={classes.header_right}>
          <div className={classes.header_search}>
            <FontAwesomeIcon icon={faSearch} className={classes.header_search_icon} />
            <Popover
              trigger={(
                <Input type="search" value={text} placeholder={t('Search...')} onChange={handleSearch} />
              )}
              placement="bottom-end"
              id="id"
              rootClose
            >{() => (
              <div className={classes.searchResult}>
                {searchResult.map(result => (<SearchResult key={result.id} project={result} />))}
              </div>
            )}
            </Popover>
          </div>
          {isAuthorized
            ? (
              <Nav
                className={classes.desktop_header_user_menu}
              >
                <div
                  className={`
                    ${classes.header_hypeCoin}
                    ${isBalance ? '' : classes.hide}
                  `}
                >
                  <Link to={Routes.ADDFUNDS}><img src={hypeCoin} alt="HypeCoin" /></Link>
                  <Link to={Routes.ADDFUNDS}>{balance}</Link>
                </div>
                <NotificationPopover notifications={notifications} />
                <div className={classes.desktop_profile}>
                  <Nav.Link
                    onClick={handleProfileMenu}
                  >
                    <Avatar
                      width={35}
                      userName={`${firstName} ${lastName}`}
                      className={classes.header_profile_avatar}
                    />
                  </Nav.Link>
                  <div
                    className={`
                          ${classes.desktop_menu_profile}
                          ${isProfileMenu ? classes.visible : classes.hide}
                        `}
                  >
                    <div
                      className={`
                          ${classes.desktop_menu_item}
                        `}
                    >
                      <OpenUserModal />
                    </div>
                    <div
                      className={`
                          ${classes.desktop_menu_item}
                          ${classes.line_both_desktop}
                        `}
                    >
                      <LanguageSwitcher />
                    </div>
                    <NavLink
                      to={Routes.PROJECTS_CREATE}
                      className={`
                          ${classes.desktop_menu_item}
                          ${classes.line_both_desktop}
                        `}
                    >
                      {t('Create project')}
                    </NavLink>
                    <NavLink
                      to={Routes.LOGIN}
                      className={classes.desktop_menu_item}
                      onClick={logout}
                    >
                      {t('Log out')}
                    </NavLink>
                  </div>
                </div>
              </Nav>
            )
            : (
              <Nav className={classes['auth-buttons-wrapper']}>
                <Button
                  className={classes['auth-button']}
                  to={Routes.LOGIN}
                >{t('Log In')}
                </Button>
                <Button
                  className={classes['auth-button']}
                  to={Routes.SIGNUP}
                >{t('Sign Up')}
                </Button>
              </Nav>
            )}
        </div>
      </div>
      <Navbar
        expand="xxl"
        variant="dark"
        className={`
          ${classes.mobile_navigation}
          ${isMobile ? classes.visible : classes.hide}
        `}
      >
        <div className={classes.mobile_search}>
          <FontAwesomeIcon
            icon={faSearch}
            className={classes.mobile_search_icon}
          />
          <Input
            type="search"
            value={text}
            placeholder={t('Search...')}
            onChange={handleSearch}
          />
        </div>
        <div className={classes.mobile_hamburger_menu}>
          <Navbar.Toggle
            onClick={handleMenuForMobile}
          />
          <Nav
            className={`
              ${classes.mobile_menu_list}
              ${isMobileMenu ? classes.visible : classes.hide}
            `}
          >
            <NavLink
              to={Routes.HOME}
              className={classes.mobile_menu_item}
              onClick={handleHideProfileMenu}
            >
              {t('Home')}
            </NavLink>
            <NavLink
              className={`
                  ${classes.line_both}
                  ${classes.mobile_menu_item}
              `}
              to={Routes.PROJECTS}
              onClick={handleHideProfileMenu}
            >
              {t('Projects')}
            </NavLink>
            <NavLink
              to={Routes.TRENDS}
              className={classes.mobile_menu_item}
              onClick={handleHideProfileMenu}
            >
              {t('Trends')}
            </NavLink>
          </Nav>
        </div>
        <NavLink
          to={Routes.HOME}
          className={classes.mobile_logo}

        >
          <Logo />
        </NavLink>
        <div
          className={`
            ${classes.header_hypeCoin}
            ${classes.mobile_hypeCoin}
            ${isBalance ? '' : classes.hide}
          `}
        >
          <img src={hypeCoin} alt="HypeCoin" />
          <span>{balance}</span>
        </div>
        <div className={classes.mobile_notification}>
          <NotificationPopover notifications={notifications} />
        </div>
        <div className={classes.mobile_profile}>
          <Nav.Link
            onClick={handleProfileMenu}
          >
            <Avatar
              width={35}
              userName={`${firstName} ${lastName}`}
              className={classes.header_profile_avatar}
            />
          </Nav.Link>
          <div
            className={`
                  ${classes.mobile_menu_profile}
                  ${isProfileMenu ? classes.visible : classes.hide}
            `}
          >
            <div
              className={classes.mobile_menu_item}
            >
              <OpenUserModal />
            </div>
            <div
              className={`
                  ${classes.mobile_menu_item}
                  ${classes.line_both}
                `}
            >
              <LanguageSwitcher />
            </div>
            <NavLink
              to={Routes.PROJECTS_CREATE}
              className={`
                  ${classes.mobile_menu_item}
                  ${classes.line_both}
                `}
            >
              {t('Create project')}
            </NavLink>
            <NavLink
              to={Routes.LOGIN}
              className={classes.mobile_menu_item}
              onClick={logout}
            >
              {t('Log out')}
            </NavLink>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
