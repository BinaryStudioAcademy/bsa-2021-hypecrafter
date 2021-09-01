import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../common/enums';
import { NotificationType } from '../../common/types/notification';
import Button from '../Button';
import Notification from '../Notification';
import Popover from '../Popover';
import classes from './styles.module.scss';

interface Props {
  notifications: Array<NotificationType>;
}

const NotificationPopover = (props: Props) => {
  const { notifications } = props;
  const [unreadMessageCount, setUnreadMessageCount] = useState(notifications.length);

  return (
    <div>
      <Popover
        trigger={(
          <div className={classes.header_natification}>
            <FontAwesomeIcon icon={faBell} className={classes.header_natification_bell} />
            { !!unreadMessageCount
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
                  data={notification.data}
                  type={notification.type}
                  key={notification.id}
                  setUnreadMessageCount={setUnreadMessageCount}
                  unreadMessageCount={unreadMessageCount}
                />
              ))}
            </div>
            {!notifications.length
              && (
              <div className={classes['no-notifications']}>
                <span>No more notifications</span>
              </div>
              )}
            {true
              && (
              <Button className={classes['load-more']}>
                Load more
              </Button>
              )}
          </div>
        )}
      </Popover>
    </div>
  );
};

export default NotificationPopover;
