import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown as faThumbsDownFilled, faThumbsUp as faThumbsUpFilled } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Mark } from '../../common/enums';
import { calcDaysToGo, calcDonationProgress } from '../../helpers/project';
import { useAction } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import Button from '../Button';
import ProgressBarComponent from '../ProgressBar';
import classes from './styles.module.scss';

interface ProjectInfoProps {
  id: string;
  donated: number;
  goal: number;
  bakersAmount: number;
  likes: number;
  dislikes: number;
  finishDate: string;
  mark: string | null | undefined;
  isAuthorized: boolean;
}

const ProjectInfo: FunctionComponent<ProjectInfoProps> = ({
  id,
  donated,
  goal,
  bakersAmount,
  likes,
  dislikes,
  finishDate,
  mark,
  isAuthorized
}) => {
  const { setReaction } = useAction();
  const { t } = useLocalization();

  const handleLike = () => {
    setReaction({ isLiked: mark === Mark.LIKE ? null : true, projectId: id });
  };

  const handleDislike = () => {
    setReaction({ isLiked: mark === Mark.DISLIKE ? null : false, projectId: id });
  };

  const daysToGo = calcDaysToGo(finishDate);

  return (
    <Container className={classes['info-block-container']}>
      <Row>
        <Col xs={4}>
          <div className={classes['info-block-entity']}>
            <p className={classes['info-backers-amount']}>{bakersAmount}</p>
            <p className={classes['info-backers']}>{t('Backers')}</p>
          </div>
        </Col>
        <Col xs={4}>
          <div className={classes['info-block-entity']}>
            <p className={classes['info-goal-amount']}>{donated}</p>
            <p className={classes['info-goal']}>{t('Donated')}</p>
          </div>
        </Col>
        <Col xs={4}>
          <div className={classes['info-block-entity']}>
            <p className={classes['info-days-amount']}>{daysToGo < 0 ? t('Ended') : daysToGo}</p>
            <p className={classes['info-days']}>{t('Days to go')}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <ProgressBarComponent goal={goal} percent={calcDonationProgress(donated, goal)} />
      </Row>
      <Row className={classes['info-block-footer']}>
        <div className={classes['likes-container']}>
          <button
            type='button'
            onClick={handleLike}
            disabled={!isAuthorized}
            className={classes[`${!isAuthorized && 'disabled'}`]}
          >
            {mark === Mark.LIKE
              ? (<FontAwesomeIcon icon={faThumbsUpFilled} size='2x' />)
              : (<FontAwesomeIcon icon={faThumbsUp} size='2x' />)}
          </button>
          <span className={classes['likes-amount']}>{likes}</span>
        </div>
        <div className={classes['dislikes-container']}>
          <button
            type='button'
            onClick={handleDislike}
            disabled={!isAuthorized}
            className={classes[`${!isAuthorized && 'disabled'}`]}
          >
            {mark === Mark.DISLIKE
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
