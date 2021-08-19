import { FC } from 'react';
import { useLocalization } from '../../providers/localization';
import { date } from '../../services/date';
import Avatar from '../Avatar';
import classes from './styles.module.scss';

interface CommentProps {
  comment: {
    author: {
      firstName: string;
      lastName: string;
      avatar?: string;
      isBacker?: boolean;
      isOwner?: boolean;
    };
    createdAt: string;
    message: string;
  };
}

const Comment: FC<CommentProps> = ({
  comment: {
    author: {
      firstName,
      lastName,
      avatar = 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png',
      isBacker = false,
      isOwner = false,
    },
    createdAt,
    message
  }
}) => {
  const { t } = useLocalization();
  const roleBacker = !isOwner && isBacker;
  const role = () => {
    if (isOwner) return t('OWNER');
    if (roleBacker) return t('BACKER');
    return '';
  };
  return (
    <div className={classes.comment}>
      <div className={classes.header}>
        <Avatar
          src={avatar}
          width={57}
          className={classes.user_avatar}
        />
        <div className={classes.metadata}>
          <div className={classes.name}>
            <span>{firstName} {lastName}</span>
            <div
              className={`
                ${classes.badge}
                ${roleBacker ? classes.backer : ''}
                ${isOwner ? classes.owner : ''}
              `}
            >
              {role()}
            </div>
          </div>
          <div className={classes.date}>
            {`${t('posted')} ${date.getRelativeDate(createdAt)}`}
          </div>
        </div>
      </div>
      <div className={classes.body}>
        {message}
      </div>
    </div>
  );
};

export default Comment;
