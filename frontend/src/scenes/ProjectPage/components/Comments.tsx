import { FC, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Comment } from '../../../common/types';
import Buttom from '../../../components/Button';
import CommentComponent from '../../../components/Comment';
import Input from '../../../components/Input';
import { useAction, useAuth } from '../../../hooks';
import { useLocalization } from '../../../providers/localization';
import classes from '../styles.module.scss';

interface CommentsProps {
  comments: Comment[];
  projectId: string;
}

const Comments: FC<CommentsProps> = ({ comments, projectId }) => {
  const { t } = useLocalization();

  const { addComment } = useAction();
  const { id, isAuthorized } = useAuth();

  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = () => {
    if (id) {
      if (text) {
        addComment({
          message: text,
          project: projectId,
          author: id.toString()
        });
        setText('');
        setErrorMessage('');
      } else {
        setErrorMessage(`${t('Comment can not be empty')}`);
      }
    }
  };

  return (
    <Col>
      <Row className={classes['comment-wrapper']}>
        {comments.filter(comment => comment.id).map((el) => (
          <CommentComponent key={el.id} comment={el} />
        ))}
      </Row>
      {isAuthorized && (
        <Row className={classes['comment-input-wrapper']}>
          <Col xs={10} sm={6}>
            <Input
              value={text}
              onChange={(ev) => setText(ev.target.value)}
              placeholder="Write your comment..."
              errorMessage={errorMessage}
            />
          </Col>
          <Col xs={1} sm={1}>
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
      )}
    </Col>
  );
};

export default Comments;
