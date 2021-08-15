/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import { useWindowResize } from '../../hooks';
import hypeCoin from '../../assets/HypeCoin.png';
import { Routes } from '../../common/enums';
import Avatar from '../Avatar';
import Input from '../Input';
import Link from '../Link';
import Logo from '../Logo';
import Popover from '../Popover';
import classes from './styles.module.scss';

const Header = () => {
  let prevScrollPos = window.pageYOffset;
  const [text, setText] = useState('');
  const [isMobileMenu, setMobileMenu] = useState(false);
  const [isProjectsMobileMenu, setProjectsMobileMenu] = useState(false);
  const [isProfileMobileMenu, setProfileMobileMenu] = useState(false);
  const [isHideOnScroll, setHideOnScroll] = useState(true);
  const { isMobile } = useWindowResize();

  const handleProfileMenuForMobile = () => {
    if (!isMobile) {
      setProfileMobileMenu(false);
      return;
    }

    if (!isProfileMobileMenu) {
      setMobileMenu(false);
      setProjectsMobileMenu(false);
    }

    setProfileMobileMenu(!isProfileMobileMenu);
  };

  const handleMenuForMobile = () => {
    if (!isMobile) {
      setMobileMenu(false);
      return;
    }

    if (isMobileMenu && isProjectsMobileMenu) {
      setProjectsMobileMenu(false);
    }

    if (!isMobileMenu) {
      setProfileMobileMenu(false);
    }

    setMobileMenu(!isMobileMenu);
  };

  const handleProjectsMenuForMobile = () => {
    if (!isMobile && !isMobileMenu) {
      setProjectsMobileMenu(false);
      return;
    }

    setProjectsMobileMenu(!isProjectsMobileMenu);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  document.onscroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      setHideOnScroll(true);
      setProfileMobileMenu(false);
      setMobileMenu(false);
      setProjectsMobileMenu(false);
    } else {
      setHideOnScroll(false)
    }
    prevScrollPos = currentScrollPos;
  }

  return (
    <>
      <div className={`
      ${classes.header}
      ${isMobile ? classes.hide : classes.visible}
    `}
      >
        <div className={classes.header_left}>
          <Link to={Routes.HOME}>
            <Logo />
          </Link>
          <nav>
            <NavLink
              className={classes.header_menu_item}
              activeClassName={classes.header_menu_item_active}
              to={Routes.HOME}
            >
              Home
            </NavLink>
            <NavLink
              className={classes.header_menu_item}
              to={Routes.PROJECTS}
            >
              Projects
              <FontAwesomeIcon
                icon={faCaretDown}
                className={classes.header_menu_item_down}
              />
            </NavLink>
            <NavLink
              className={classes.header_menu_item}
              activeClassName={classes.header_menu_item_active}
              to={Routes.TRENDS}
            >
              Trends
            </NavLink>
          </nav>
        </div>
        <div className={classes.header_right}>
          <div className={classes.header_search}>
            <FontAwesomeIcon icon={faSearch} className={classes.header_search_icon} />
            <Input type="search" value={text} placeholder="Search..." onChange={handleSearch} />
          </div>
          <div className={classes.header_hypeCoin}>
            <img src={hypeCoin} alt="HypeCoin" />
            <span>1500</span>
          </div>
          <div className={classes.header_natification}>
            <FontAwesomeIcon icon={faBell} className={classes.header_natification_bell} />
            {true && <FontAwesomeIcon icon={faCircle} className={classes.header_natification_new} />}
          </div>
          <Popover
            trigger={(
              <div className={classes.header_profile}>
                <Avatar width={35} userName="Hype Coin" className={classes.header_profile_avatar} />
                <FontAwesomeIcon icon={faCaretDown} className={classes.header_profile_down} />
              </div>
            )}
            placement="bottom-end"
            id="id"
            rootClose
            className={classes.menu_user_container}
          >
            {() => (
              <div className={classes.menu_user}>
                <Link to={Routes.PROFILE}>View account</Link>
                <Link to={Routes.PROFILE}>Edit profile</Link>
                <div className={classes.menu_line} />
                <Link to={Routes.PROJECTS_CREATE}>Create project</Link>
                <div className={classes.menu_line} />
                <Link to={Routes.LOGOUT}>Log out</Link>
              </div>
            )}
          </Popover>
        </div>
      </div>
      <div className={isMobile ? classes.visible : classes.hide}>
        <Navbar
          expand="xxl"
          variant="dark"
          className={`
          ${classes.mobile_navigation}
          ${isHideOnScroll ? classes.mobile_hide_on_scroll : ''}
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
              placeholder="Search..."
              onChange={handleSearch}
            />
          </div>
          <div className={classes.mobile_hamburger_menu}>
            <Navbar.Toggle
              onClick={handleMenuForMobile}
              onTouchStart={handleMenuForMobile}
            />
            <Nav className={`
                ${classes.mobile_menu_list}
                ${isMobileMenu ? classes.visible : classes.hide}
              `}
            >
              <NavLink
                to={Routes.HOME}
                className={classes.mobile_menu_item}
              >
                Home
              </NavLink>
              <div
                className={classes.mobile_menu_projects}
              >
                <div
                  className={`
                    ${classes.line_both}
                    ${classes.mobile_projects_drop}
                  `}
                  onClick={handleProjectsMenuForMobile}
                  onTouchStart={handleProjectsMenuForMobile}
                >
                  Projects
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className={isProjectsMobileMenu ? classes.visible : classes.hide}
                  />
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className={isProjectsMobileMenu ? classes.hide : classes.visible}
                  />
                </div>
                <div
                  className={`
                  ${classes.mobile_project_menu_list}
                  ${isProjectsMobileMenu ? classes.visible : classes.hide}
                    `}
                >
                  <NavLink
                    to={Routes.PROJECTS}
                    className={classes.mobile_menu_item}
                  >
                    Project_1
                  </NavLink>
                  <NavLink
                    to={Routes.PROJECTS}
                    className={classes.mobile_menu_item}
                  >
                    Project_2
                  </NavLink>
                  <NavLink
                    to={Routes.PROJECTS}
                    className={classes.mobile_menu_item}
                  >
                    Project_3
                  </NavLink>
                </div>
              </div>
              <NavLink
                to={Routes.TRENDS}
                className={classes.mobile_menu_item}
              >
                Trends
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
            <div
              onClick={handleProfileMenuForMobile}
              onTouchStart={handleProfileMenuForMobile}
            >
              <Avatar
                width={35}
                userName="Hype Coin"
                className={classes.header_profile_avatar}
              />
            </div>
            <div
              className={`
                ${classes.mobile_menu_profile}
                ${isProfileMobileMenu ? classes.visible : classes.hide}
              `}
            >
              <NavLink
                to={Routes.PROFILE}
                className={classes.mobile_menu_item}
              >
                View account
              </NavLink>
              <NavLink
                to={Routes.PROFILE}
                className={classes.mobile_menu_item}
              >
                Edit profile
              </NavLink>
              <NavLink
                to={Routes.PROJECTS_CREATE}
                className={`
                  ${classes.mobile_menu_item}
                  ${classes.line_both}
                `}
              >
                Create project
              </NavLink>
              <NavLink
                to={Routes.LOGOUT}
                className={classes.mobile_menu_item}
              >
                Log out
              </NavLink>
            </div>
          </div>
        </Navbar>
      </div >
    </>
  );
};

export default Header;
