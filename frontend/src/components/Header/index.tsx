import { faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faCaretDown,
  faCircle,
  faSearch,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useWindowResize, useScroll } from '../../hooks';
import hypeCoin from '../../assets/HypeCoin.png';
import { Routes } from '../../common/enums';
import { useLocalization } from '../../providers/localization';
import Avatar from '../Avatar';
import Input from '../Input';
import Link from '../Link';
import Logo from '../Logo';
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

  const handleProfileMenuForMobile = () => {
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

  const handleProjectsMenuForMobile = () => {
    if (!isProjectsMenu) {
      setProfileMenu(false);
    }
    setProjectsMenu(!isProjectsMenu);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const scrollDownCallback = () => {
    setVisibleOnScroll(false);
  };

  const scrollUpCallback = () => {
    setVisibleOnScroll(true);
  };

  useScroll(
    30,
    {
      scrollDownCallback,
      scrollUpCallback
    }
  );

  return (
    <>
      <div
        className={`
          ${classes.header}
          ${isMobile ? classes.hide : classes.desktop_visible}
          ${isVisibleOnScroll ? classes.mobile_hide_on_scroll : ''}
        `}
      >
        <div className={classes.header_left}>
          <Link to={Routes.HOME}>
            <Logo />
          </Link>
          <Nav
            className={classes.desktop_header_menu}
          >
            <NavLink
              className={classes.header_menu_item}
              activeClassName={classes.header_menu_item_active}
              to={Routes.HOME}
            >
              {t('Home')}
            </NavLink>
            <div
              className={classes.mobile_menu_projects}
            >
              <Nav.Link
                className={classes.desktop_projects_drop}
                onClick={handleProjectsMenuForMobile}
                onTouchStart={handleProjectsMenuForMobile}
              >
                {t('Projects')}
                <FontAwesomeIcon
                  icon={faCaretRight}
                  className={isProjectsMenu ? classes.visible : classes.hide}
                />
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={isProjectsMenu ? classes.hide : classes.visible}
                />
              </Nav.Link>
              <div
                className={`
                  ${classes.desktop_project_menu_list}
                  ${isProjectsMenu ? classes.visible : classes.hide}
                  ${isVisibleOnScroll ? classes.mobile_hide_on_scroll : ''}
                `}
              >
                <NavLink
                  to={Routes.PROJECTS}
                  className={classes.desktop_menu_item}
                >
                  {t('Projects')} 1
                </NavLink>
                <NavLink
                  to={Routes.PROJECTS}
                  className={classes.desktop_menu_item}
                >
                  {t('Projects')} 2
                </NavLink>
                <NavLink
                  to={Routes.PROJECTS}
                  className={classes.desktop_menu_item}
                >
                  {t('Projects')} 3
                </NavLink>
              </div>
            </div>
            <NavLink
              className={`
                ${classes.header_menu_item}
                ${classes.desktop_trends}
              `}
              activeClassName={classes.header_menu_item_active}
              to={Routes.TRENDS}
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
          <Nav
            className={classes.desktop_header_user_menu}
          >
            <div className={classes.header_hypeCoin}>
              <Link to={Routes.ADDFUNDS}><img src={hypeCoin} alt="HypeCoin" /></Link>
              <Link to={Routes.ADDFUNDS}>1500</Link>
            </div>
            <div className={classes.header_natification}>
              <FontAwesomeIcon icon={faBell} className={classes.header_natification_bell} />
              {true && <FontAwesomeIcon icon={faCircle} className={classes.header_natification_new} />}
            </div>
            <div className={classes.desktop_profile}>
              <Nav.Link
                onClick={handleProfileMenuForMobile}
                onTouchStart={handleProfileMenuForMobile}
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
                ${isVisibleOnScroll ? classes.mobile_hide_on_scroll : ''}
              `}
              >
                <NavLink
                  to={Routes.PROFILE}
                  className={classes.desktop_menu_item}
                >
                  {t('View account')}
                </NavLink>
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
                  to={Routes.LOGOUT}
                  className={classes.desktop_menu_item}
                >
                  {t('Log out')}
                </NavLink>
              </div>
            </div>
          </Nav>
        </div>
      </div>
      <div className={isMobile ? classes.visible : classes.hide}>
        <Navbar
          expand="xxl"
          variant="dark"
          className={`
          ${classes.mobile_navigation}
          ${isVisibleOnScroll ? classes.mobile_hide_on_scroll : ''}
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
              onTouchStart={handleMenuForMobile}
            />
            <Nav
              className={`
                ${classes.mobile_menu_list}
                ${isMobileMenu ? classes.visible : classes.hide}
                ${isVisibleOnScroll ? classes.mobile_hide_on_scroll : ''}
              `}
            >
              <NavLink
                to={Routes.HOME}
                className={classes.mobile_menu_item}
              >
                {t('Home')}
              </NavLink>
              <div
                className={classes.mobile_menu_projects}
              >
                <Nav.Link
                  className={`
                    ${classes.line_both}
                    ${classes.mobile_projects_drop}
                  `}
                  onClick={handleProjectsMenuForMobile}
                  onTouchStart={handleProjectsMenuForMobile}
                >
                  {t('Projects')}
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className={isProjectsMenu ? classes.visible : classes.hide}
                  />
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className={isProjectsMenu ? classes.hide : classes.visible}
                  />
                </Nav.Link>
                <div
                  className={`
                    ${classes.mobile_project_menu_list}
                    ${isProjectsMenu ? classes.visible : classes.hide}
                    ${isVisibleOnScroll ? classes.mobile_hide_on_scroll : ''}
                  `}
                >
                  <NavLink
                    to={Routes.PROJECTS}
                    className={classes.mobile_menu_item}
                  >
                    {t('Projects')} 1
                  </NavLink>
                  <NavLink
                    to={Routes.PROJECTS}
                    className={classes.mobile_menu_item}
                  >
                    {t('Projects')} 2
                  </NavLink>
                  <NavLink
                    to={Routes.PROJECTS}
                    className={classes.mobile_menu_item}
                  >
                    {t('Projects')} 3
                  </NavLink>
                </div>
              </div>
              <NavLink
                to={Routes.TRENDS}
                className={classes.mobile_menu_item}
              >
                {t('Trends')}
              </NavLink>
            </Nav>
          </div>
          <NavLink to={Routes.HOME} className={classes.mobile_logo}>
            <Logo />
          </NavLink>
          <div
            className={`${classes.header_hypeCoin} ${classes.mobile_hypeCoin}`}
          >
            <img src={hypeCoin} alt="HypeCoin" />
            <span>1500</span>
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
              onClick={handleProfileMenuForMobile}
              onTouchStart={handleProfileMenuForMobile}
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
                ${isVisibleOnScroll ? classes.mobile_hide_on_scroll : ''}
              `}
            >
              <NavLink
                to={Routes.PROFILE}
                className={classes.mobile_menu_item}
              >
                {t('View account')}
              </NavLink>
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
                to={Routes.LOGOUT}
                className={classes.mobile_menu_item}
              >
                {t('Log out')}
              </NavLink>
            </div>
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
