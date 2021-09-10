import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../common/enums';
import { useTypedSelector } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import Avatar from '../Avatar';
import OpenUserModal from '../OpenUserModalOption';
import Popover from '../Popover';
import LanguageSwitcher from '../SwitchLanguageOption/LanguageSwitcher';
import classes from './styles.module.scss';

interface Props {
  logout(): void;
}

const ProfilePopover: FC<Props> = ({ logout }) => {
  const { t } = useLocalization();
  const { firstName, lastName } = useTypedSelector(({ auth }) => (
    !auth?.user
      ? {
        firstName: '',
        lastName: ''
      }
      : auth.user
  ));

  return (
    <Popover
      id={`popover-profile ${firstName} ${lastName}`}
      rootClose
      placement="bottom-end"
      trigger={(
        <div className={classes.desktop_profile}>
          <Avatar
            width={35}
            userName={`${firstName} ${lastName}`}
            className={classes.header_profile_avatar}
          />
        </div>
      )}
    >
      {() => (
        <div>
          <div
            className={classes.desktop_menu_item}
          >
            <OpenUserModal />
          </div>
          <div
            className={classNames(classes.desktop_menu_item, classes.line_both_desktop)}
          >
            <LanguageSwitcher />
          </div>
          <NavLink
            to={Routes.PROJECTS_CREATE}
            className={classNames(classes.desktop_menu_item, classes.line_both_desktop)}
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
      )}

    </Popover>
  );
};

export default ProfilePopover;
