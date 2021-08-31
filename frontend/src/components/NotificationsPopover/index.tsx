import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../common/enums';
import { Notification as NotificationType } from '../../common/types/notification';
import Notification from '../Notification';
import Popover from '../Popover';
import classes from './styles.module.scss';

interface Props {
  notifications: Array<NotificationType>;
}

const NotificationPopover = (props: Props) => {
  const { notifications } = props;

  return (
    <div>
      <Popover
        trigger={(
          <div className={classes.header_natification}>
            <FontAwesomeIcon icon={faBell} className={classes.header_natification_bell} />
            { !!notifications.length
            && <FontAwesomeIcon icon={faCircle} className={classes.header_natification_new} />}
          </div>
        )}
        placement="bottom-end"
        id="id"
        rootClose
      >
        {() => (
          <div className={classes.popover}>
            <div className={classes['notification-popover-header']}>
              <h3 className={classes['notifications-title']}>Notifications</h3>
              <NavLink
                className={classes['notifications-settings']}
                to={Routes.HOME}
              >
                <FontAwesomeIcon
                  icon={faSlidersH}
                  color="white"
                />
                <span
                  className={classes['menage-title']}
                >Manage Preferences
                </span>
              </NavLink>
            </div>
            <div className={classes['notification-popover-main']}>
              {notifications.map((notification) => (
                <Notification
                  image={notification.image}
                  text={notification.text}
                  date={notification.date}
                  key={notification.id}
                />
              ))}
            </div>
            {!notifications.length
                        && (
                        <div className={classes['notification-popover-footer']}>
                          <span>No more notifications</span>
                        </div>
                        )}
          </div>
        )}
      </Popover>
    </div>
  );
};

export default NotificationPopover;
