import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import hypeCoin from '../../assets/HypeCoin.png';
import { Routes } from '../../common/enums';
import Avatar from '../Avatar';
import Input from '../Input';
import Link from '../Link';
import Logo from '../Logo';
import classes from './styles.module.scss';

const Header = () => {
  const [text, setText] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className={classes.header}>
      <div className={classes.header_left}>
        <Link to={Routes.HOME}><Logo /></Link>
        <nav>
          <NavLink
            className={classes.header_menu_item}
            activeClassName={classes.header_menu_item_active}
            to={Routes.HOME}
          >Home
          </NavLink>
          <NavLink
            className={classes.header_menu_item}
            activeClassName={classes.header_menu_item_active}
            to={Routes.PROJECTS}
          >Projects
            <FontAwesomeIcon icon={faCaretDown} className={classes.header_menu_item_down} />
          </NavLink>
          <NavLink
            className={classes.header_menu_item}
            activeClassName={classes.header_menu_item_active}
            to={Routes.TRENDS}
          >Trends
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
        <div className={classes.header_profile}>
          <Avatar width={35} userName="Hype Coin" className={classes.header_profile_avatar} />
          <FontAwesomeIcon icon={faCaretDown} className={classes.header_profile_down} />
        </div>
      </div>
    </div>
  );
};

export default Header;
