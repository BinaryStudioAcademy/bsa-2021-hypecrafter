import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Buttom from '../../../components/Button';
import Comment from '../../../components/Comment';
import Input from '../../../components/Input';
import classes from '../styles.module.scss';

const comments = [
  {
    id: 1,
    author: {
      firstName: 'Max',
      lastName: 'Gavatuk',
      avatar:
        'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png',
      isBacker: true,
      isOwner: false
    },
    createdAt: 'Sun Dec 17 1995 03:24:00 GMT',
    message: 'Some message'
  },
  {
    id: 2,
    author: {
      firstName: 'Max',
      lastName: 'Gavatuk',
      avatar:
        'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png',
      isBacker: false,
      isOwner: true
    },
    createdAt: 'Sun Dec 17 1995 03:24:00 GMT',
    message: 'Some message'
  },
  {
    id: 3,
    author: {
      firstName: 'Max',
      lastName: 'Gavatuk',
      avatar:
        'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png',
      isBacker: false,
      isOwner: false
    },
    createdAt: 'Sun Dec 17 1995 03:24:00 GMT',
    message: 'Some message'
  },
  {
    id: 4,
    author: {
      firstName: 'Max',
      lastName: 'Gavatuk',
      avatar:
        'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png',
      isBacker: false,
      isOwner: false
    },
    createdAt: 'Sun Dec 17 1995 03:24:00 GMT',
    message: 'Some message'
  }
];

const Comments: FC = () => {
  const handleClick = () => {
    console.log('Data');
  };

  return (
    <Col>
      <Row>
        {comments.map((el) => (
          <Comment key={el.id} comment={el} />
        ))}
      </Row>
      <Row className={classes['comment-input-wrapper']}>
        <Col xs={6}>
          <Input placeholder="Write your comment..." />
        </Col>
        <Col xs={1}>
          <Buttom
            className={classes['comment-btn']}
            icon={(
              <img
                height="30px"
                src="https://img.icons8.com/ios/500/sent.png"
                alt="альтернативный текст"
              />
            )}
            onClick={handleClick}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default Comments;
