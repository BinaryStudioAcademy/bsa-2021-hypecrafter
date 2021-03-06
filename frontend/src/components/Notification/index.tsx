/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faCheckSquare, faClock, faCoins, faComments,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { Button as ButtonRB } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NotificationMessageTypes } from '../../common/enums/notifications';
import { NotificationData, NotificationLink, NotificationType } from '../../common/types/notification';
import { useAction } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import { date } from '../../services/date';
import classes from './styles.module.scss';

const Notification = (props: NotificationType) => {
  const { data, type, isRead, id } = props;

  const { setNotificationIsReadAction, openModalAction } = useAction();

  const { t } = useLocalization();

  const notificationCardClass = classnames({
    [classes['notification-card']]: true,
    [classes.watched]: isRead
  });

  const handleCardClick = () => {
    setNotificationIsReadAction(id as string);
  };

  const getNotificationInfo = {
    [NotificationMessageTypes.LIKE]: (
      { user, project, messageDate }: NotificationData
    ) => ({
      image: faThumbsUp,
      message: (
        <span>
          <Link
            onClick={() => openModalAction((user as NotificationLink).link)}
            to="#"
          >
            {(user as NotificationLink).name}
          </Link>
          {' '}{t('liked your')}{' '}
          <Link to={`/projects/${project.link}`}>{project.name}</Link>
        </span>
      ),
      messageDate: date.getDate(messageDate),
    }),
    [NotificationMessageTypes.COMMENT]: (
      { user, project, messageDate } : NotificationData
    ) => ({
      image: faComments,
      message: (
        <span>
          <Link
            onClick={() => openModalAction((user as NotificationLink).link)}
            to="#"
          >
            {(user as NotificationLink).name}
          </Link>
          {' '}{t('commented your')}{' '}
          <Link to={`/projects/${project.link}`}>{project.name}</Link>
        </span>
      ),
      messageDate: date.getDate(messageDate),
    }),
    [NotificationMessageTypes.DONATE]: (
      { user, project, donation, messageDate }: NotificationData
    ) => ({
      image: faCoins,
      message: (
        <span>
          <Link
            onClick={() => openModalAction((user as NotificationLink).link)}
            to="#"
          >
            {(user as NotificationLink).name}
          </Link>{' '}
          {t('donated')} <span className={classes.amount}>{donation}</span> {t('hypeCoins to')}{' '}
          <Link to={`/projects/${project.link}`}>{project.name}</Link>
        </span>
      ),
      messageDate: date.getDate(messageDate),
    }),
    [NotificationMessageTypes.PROJECT_GOAL_ACHIEVED]: (
      { project, messageDate }: NotificationData
    ) => ({
      image: faCheckSquare,
      message: (
        <span>
          <Link to={`/projects/${project.link}`}>{project.name}</Link> {t('achieved goal')} ????
        </span>
      ),
      messageDate: date.getDate(messageDate),
    }),
    [NotificationMessageTypes.PROJECT_TIME_OUT]: (
      { project, messageDate }: NotificationData
    ) => ({
      image: faClock,
      message: (
        <span>
          {t('Fundraising time for')} <Link to={`/projects/${project.link}`}>{project.name}</Link> {t('is over')}
        </span>
      ),
      messageDate: date.getDate(messageDate),
    }),
  };

  const notificationInfo = getNotificationInfo[type](data);

  return (
    <div>
      <ButtonRB type="button" className={notificationCardClass} onClick={handleCardClick}>
        <FontAwesomeIcon className={classes.image} icon={notificationInfo.image} />
        <div className={classes.message}>
          <div className={classes.text}>{notificationInfo.message}</div>
          <div className={classes.date}>{notificationInfo.messageDate}</div>
        </div>
      </ButtonRB>
    </div>
  );
};

export default Notification;
