import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import hypeCoin from '../../assets/HypeCoin.png';
import { Routes } from '../../common/enums';
import { logout } from '../../helpers/http';
import { useAuth, useScroll, useWindowResize, useBalance } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import Avatar from '../Avatar';
import Button from '../Button';
import Input from '../Input';
import Link from '../Link';
import Logo from '../Logo';
import OpenUserModal from '../OpenUserModalOption';
import LanguageSwitcher from '../SwitchLanguageOption/LanguageSwitcher';
import classes from './styles.module.scss';

const Header = () => {
  const { t } = useLocalization();
  const [text, setText] = useState('');
  const [isMobileMenu, setMobileMenu] = useState(false);
  const [isProjectsMenu, setProjectsMenu] = useState(false);
  const [isProfileMenu, setProfileMenu] = useState(false);
  const [isVisibleOnScroll, setVisibleOnScroll] = useState(false);
  const { isMobile } = useWindowResize();

  const { isBalance, balance } = useBalance();

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

  const scrollOverLimitCallback = () => setVisibleOnScroll(false);
  const scrollUnderLimitCallback = () => setVisibleOnScroll(true);

  useScroll(30, { scrollOverLimitCallback, scrollUnderLimitCallback });

  const handleHideProfileMenu = () => {
    setProfileMenu(false);
    setMobileMenu(false);
  };

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
            <NavLink
              to={Routes.HOME}
              className={classes.header_menu_item}
              activeClassName={classes.header_menu_item_active}
              onClick={handleHideProfileMenu}
            >
              {t('Home')}
            </NavLink>
            <NavLink
              to={Routes.PROJECTS}
              className={classes.header_menu_item}
              onClick={handleHideProfileMenu}
            >
              {t('Projects')}
            </NavLink>
            <NavLink
              className={`
                ${classes.header_menu_item}
                ${classes.desktop_trends}
              `}
              to={Routes.TRENDS}
              onClick={handleHideProfileMenu}
            >
              {t('Trends')}
            </NavLink>
          </Nav>
        </div>
        <div className={classes.header_right}>
          <div className={classes.header_search}>
            <FontAwesomeIcon icon={faSearch} className={classes.header_search_icon} />
            <Input type="search" value={text} placeholder={t('Search...')} onChange={handleSearch} />
          </div>
          {useAuth().isAuthorized
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
                <div className={classes.header_natification}>
                  <FontAwesomeIcon icon={faBell} className={classes.header_natification_bell} />
                  {true && <FontAwesomeIcon icon={faCircle} className={classes.header_natification_new} />}
                </div>
                <div className={classes.desktop_profile}>
                  <Nav.Link
                    onClick={handleProfileMenu}
                  >
                    <Avatar
                      width={35}
                      userName="Hype Coin"
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
                    <NavLink
                      to={Routes.PROFILE}
                      className={classes.desktop_menu_item}
                    >
                      {t('Edit profile')}
                    </NavLink>
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
                  onClick={handleHideProfileMenu}
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
          onClick={handleHideProfileMenu}
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
          <FontAwesomeIcon
            icon={faBell}
            className={classes.mobile_notification_bell}
          />
          <FontAwesomeIcon
            icon={faCircle}
            className={classes.mobile_notification_new}
          />
        </div>
        <div className={classes.mobile_profile}>
          <Nav.Link
            onClick={handleProfileMenu}
          >
            <Avatar
              width={35}
              userName="Hype Coin"
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
            <NavLink
              to={Routes.PROFILE}
              className={classes.mobile_menu_item}
            >
              {t('Edit profile')}
            </NavLink>
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
