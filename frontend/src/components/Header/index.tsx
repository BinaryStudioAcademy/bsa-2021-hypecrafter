import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import hypeCoin from '../../assets/HypeCoin.png';
import { Routes } from '../../common/enums';
import { removeAccessToken, removeRefreshToken } from '../../helpers/localStorage';
import { useLocalization } from '../../providers/localization';
import Avatar from '../Avatar';
import Input from '../Input';
import Link from '../Link';
import Logo from '../Logo';
import Popover from '../Popover';
import LanguageSwitcher from '../SwitchLanguageOption/LanguageSwitcher';
import classes from './styles.module.scss';

const Header = () => {
  const [text, setText] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleLogOut = () => {
    removeAccessToken();
    removeRefreshToken();
  };
  const { t } = useLocalization();

  return (
    <div className={classes.header}>
      <div className={classes.header_left}>
        <Link to={Routes.HOME}><Logo /></Link>
        <nav>
          <NavLink
            className={classes.header_menu_item}
            activeClassName={classes.header_menu_item_active}
            to={Routes.HOME}
          >{t('Home')}
          </NavLink>
          <NavLink
            className={classes.header_menu_item}
            activeClassName={classes.header_menu_item_active}
            to={Routes.PROJECTS}
          >{t('Projects')}
            <FontAwesomeIcon icon={faCaretDown} className={classes.header_menu_item_down} />
          </NavLink>
          <NavLink
            className={classes.header_menu_item}
            activeClassName={classes.header_menu_item_active}
            to={Routes.TRENDS}
          >{t('Trends')}
          </NavLink>
        </nav>
      </div>
      <div className={classes.header_right}>
        <div className={classes.header_search}>
          <FontAwesomeIcon icon={faSearch} className={classes.header_search_icon} />
          <Input type="search" value={text} placeholder={t('Search...')} onChange={handleSearch} />
        </div>
        <div className={classes.header_hypeCoin}>
          <Link to={Routes.ADDFUNDS}><img src={hypeCoin} alt="HypeCoin" /></Link>
          <Link to={Routes.ADDFUNDS}>1500</Link>
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
              <Link to={Routes.PROFILE}>{t('View account')}</Link>
              <Link to={Routes.PROFILE}>{t('Edit profile')}</Link>
              <div className={classes.menu_line} />
              <LanguageSwitcher />
              <div className={classes.menu_line} />
              <Link to={Routes.PROJECTS_CREATE}>{t('Create project')}</Link>
              <div className={classes.menu_line} />
              <Link to={Routes.LOGOUT} onClick={handleLogOut}>{t('Log out')}</Link>
            </div>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default Header;
