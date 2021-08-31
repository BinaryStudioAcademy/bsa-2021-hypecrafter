import { Notification as NotificationType } from '../../common/types/notification';
import classes from './styles.module.scss';

const Notification = (props: NotificationType) => {
  const { image, text, date } = props;
  return (
    <div className={classes['notification-card']}>
      <div className={classes['image-wrapper']}>
        <img className={classes.image} src={image} alt="" />
      </div>
      <div className={classes.message}>
        <div className={classes.text}>{text}</div>
        <div className={classes.date}>{date}</div>
      </div>
    </div>
  );
};

export default Notification;
