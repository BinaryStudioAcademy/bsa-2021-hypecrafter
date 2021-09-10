/* eslint-disable no-param-reassign */
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../common/enums';
import { NotificationType } from '../../common/types/notification';
import { useLocalization } from '../../providers/localization';
import Button from '../Button';
import Notification from '../Notification';
import Popover from '../Popover';
import classes from './styles.module.scss';

interface Props {
  notifications: Array<NotificationType>;
}

const NotificationPopover: FC<Props> = ({ notifications = [] }) => {
  const { t } = useLocalization();

  console.log('>>>>>>>>>>>>>>', notifications);
  if (!Array.isArray(notifications)) {
    // eslint-disable-next-line no-param-reassign
    notifications = [];
  }

  return (
    <div>
      <Popover
        trigger={(
          <div className={classes.header_natification}>
            <FontAwesomeIcon icon={faBell} className={classes.header_natification_bell} />
            { !!notifications.filter && notifications.filter(notification => !notification.isRead).length
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
              <h3 className={classes['notifications-title']}>{t('Notifications')}</h3>
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
                >{t('Manage Preferences')}
                </span>
              </NavLink>
            </div>
            <div className={classes['notification-popover-main']}>
              {notifications.map((notification) => (
                <Notification
                  isRead={notification.isRead}
                  data={notification.data}
                  type={notification.type}
                  key={notification.id}
                  id={notification.id}
                />
              ))}
            </div>
            {!notifications.length
              && (
              <div className={classes['no-notifications']}>
                <span>{t('No more notifications')}</span>
              </div>
              )}
            {false
              && (
              <Button className={classes['load-more']}>
                {t('Load more')}
              </Button>
              )}
          </div>
        )}
      </Popover>
    </div>
  );
};

export default NotificationPopover;
