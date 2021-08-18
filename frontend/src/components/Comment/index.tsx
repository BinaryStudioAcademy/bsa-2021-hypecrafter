import { FC } from 'react';
import moment from 'moment';
import { useLocalization } from '../../providers/localization';
import 'moment/locale/uk';
import Avatar from '../Avatar';
import classes from './styles.module.scss';

interface CommentProps {
  src?: string,
  comment: {
    author: {
      firstName: string;
      lastName: string;
    };
    createdAt: string;
    message: string;
  };
  fontSize?: number;
  width?: string;
  height?: string;
  avatarDiameter?: number;
  className?: string
  label?: string;
  labelClassName?: string;
  labelColor?: string;
  labelBackgroundColor?: string;
}

const Commentup: FC<CommentProps> = ({
  comment: {
    author: {
      firstName,
      lastName
    },
    createdAt,
    message
  },
  src = 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png',
  fontSize = 14,
  width = 'auto',
  height = 'auto',
  avatarDiameter = 57,
  className = '',
  label = '',
  labelClassName = '',
  labelBackgroundColor = '',
  labelColor = ''
}) => {
  const { t } = useLocalization();
  const posted = t('posted');
  const ua = 'розміщено';
  if (posted === ua) {
    moment.locale('uk');
  } else {
    moment.locale('en');
  }
  return (
    <div
      className={`
        ${classes.comment}
        ${className}
      `}
      style={{ width, height, fontSize }}
    >
      <div className={classes.header}>
        <Avatar
          src={src}
          width={avatarDiameter}
          className={classes.user_avatar}
        />
        <div className={classes.metadata}>
          <div className={classes.name}>
            <span className={classes.name_name}>{firstName} {lastName}</span>
            <div
              style={{
                backgroundColor: labelBackgroundColor,
                color: labelColor
              }}
              className={`
                ${classes.badge}
                ${labelClassName}
              `}
            >
              {label}
            </div>
          </div>
          <div className={classes.date}>
            {posted} {moment(createdAt).fromNow()}
          </div>
        </div>
      </div>
      <div className={classes.body}>
        {message}
      </div>
    </div>
  );
};

export default Commentup;
