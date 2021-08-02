import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import Button from '../Button';
import logo from '../../assets/HypeCrafter.svg';
import hypeCoin from '../../assets/HypeCoin.png';
import classes from './styles.module.scss';
import defaultUserAvatar from '../../assets/default-user-icon.png';
import Input from '../Input';

const Header = () => {
  const [text, setText] = useState('');
  const [activePage, setActivePage] = useState('home');

  return (
    <div className={classes.header}>
      <div className={classes.header_left}>
        <a href="/"><img className={classes.logo} src={logo} alt="logo" /></a>
        <Button
          className={[classes.header_menu_item,
            activePage === 'home' ? classes.header_menu_item_active : ''].join(' ')}
          onClick={() => { setActivePage('home'); }}
        >Home
        </Button>
        <Button
          className={[classes.header_menu_item,
            activePage === 'projects' ? classes.header_menu_item_active : ''].join(' ')}
          onClick={() => { setActivePage('projects'); }}
        >
          Projects
          <FontAwesomeIcon icon={faCaretDown} className={classes.header_menu_item_down} />
        </Button>
        <Button
          className={[classes.header_menu_item,
            activePage === 'trends' ? classes.header_menu_item_active : ''].join(' ')}
          onClick={() => { setActivePage('trends'); }}
        >Trends
        </Button>
      </div>
      <div className={classes.header_right}>
        <div className={classes.header_search}>
          <FontAwesomeIcon icon={faSearch} className={classes.header_search_icon} />
          <Input type="search" value={text} placeholder="Search..." onChange={setText} />
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
          <img className={classes.header_profile_avatar} alt="user" src={false || defaultUserAvatar} />
          <FontAwesomeIcon icon={faCaretDown} className={classes.header_profile_down} />
        </div>
      </div>
    </div>
  );
};

export default Header;
