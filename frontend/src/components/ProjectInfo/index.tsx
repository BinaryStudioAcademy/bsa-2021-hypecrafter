import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown as faThumbsDownFilled, faThumbsUp as faThumbsUpFilled } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { calcDaysToGo, calcDonationProgress } from '../../helpers/project';
import Button from '../Button';
import ProgressBarComponent from '../ProgressBar';
import classes from './styles.module.scss';

interface ProjectInfoProps {
  donated: number;
  goal: number;
  bakersAmount: number;
  likes: number;
  dislikes: number;
  finishDate: string;
}

const ProjectInfo: FunctionComponent<ProjectInfoProps> = ({
  donated,
  goal,
  bakersAmount,
  likes,
  dislikes,
  finishDate
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (!disliked) setLiked(!liked);
    console.log('like action');
  };

  const handleDislike = () => {
    if (!liked) setDisliked(!disliked);
    console.log('dislike action');
  };

  const daysToGo = calcDaysToGo(finishDate);

  return (
    <Container className={classes['info-block-container']}>
      <Row>
        <Col xs={4}>
          <div className={classes['info-block-entity']}>
            <p className={classes['info-backers-amount']}>{bakersAmount}</p>
            <p className={classes['info-backers']}>Backers</p>
          </div>
        </Col>
        <Col xs={4}>
          <div className={classes['info-block-entity']}>
            <p className={classes['info-goal-amount']}>{donated}</p>
            <p className={classes['info-goal']}>Donated</p>
          </div>
        </Col>
        <Col xs={4}>
          <div className={classes['info-block-entity']}>
            <p className={classes['info-days-amount']}>{daysToGo < 0 ? 'Ended' : daysToGo}</p>
            <p className={classes['info-days']}>Days to go</p>
          </div>
        </Col>
      </Row>
      <Row>
        <ProgressBarComponent goal={goal} percent={calcDonationProgress(donated, goal)} />
      </Row>
      <Row className={classes['info-block-footer']}>
        <div className={classes['likes-container']}>
          <button type='button' onClick={handleLike}>
            {liked
              ? (<FontAwesomeIcon icon={faThumbsUpFilled} size='2x' />)
              : (<FontAwesomeIcon icon={faThumbsUp} size='2x' />)}
          </button>
          <span className={classes['likes-amount']}>{likes}</span>
        </div>
        <div className={classes['dislikes-container']}>
          <button type='button' onClick={handleDislike}>
            {disliked
              ? (<FontAwesomeIcon icon={faThumbsDownFilled} size='2x' />)
              : (<FontAwesomeIcon icon={faThumbsDown} size='2x' />)}
          </button>
          <span className={classes['dislikes-amount']}>{dislikes}</span>
        </div>
        <div className={classes['buttons-container']}>
          <Button>Chat</Button>
          <Button>Donate</Button>
        </div>
      </Row>
    </Container>
  );
};

export default ProjectInfo;
