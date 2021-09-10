import { faDribbble, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBookmark as faBookmarkEmpty } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkFilled, faCog, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { projectPageColors } from '../../../common/constans';
import { Routes } from '../../../common/enums';
import { ProjectPage } from '../../../common/types';
import Button from '../../../components/Button';
import Link from '../../../components/Link';
import ModalWindow from '../../../components/ModalWindow';
import ProjectInfo from '../../../components/ProjectInfo';
import ShareProjectModal from '../../../components/ShareProjectModal';
import { useAction } from '../../../hooks';
import classes from '../styles.module.scss';

interface HeaderProps {
  project: ProjectPage;
  isAuthorized: boolean;
  userId: string | undefined;
  authorId: string;
}

const Header: FunctionComponent<HeaderProps> = ({ project, isAuthorized, userId, authorId }) => {
  const {
    id,
    name,
    description,
    category,
    imageUrl,
    videoUrl,
    // tags,
    goal,
    donated,
    bakersAmount,
    likes,
    dislikes,
    // FAQ,
    instagramUrl,
    facebookUrl,
    dribbleUrl,
    finishDate,
    mark,
    isWatched,
    involvementIndex
  } = project;

  const { setWatch } = useAction();
  const [showShareModal, setShowShareModal] = useState(false);

  const handleWatch = () => {
    setWatch({ isWatched: !isWatched, projectId: id });
  };

  const divStyle = {
    backgroundImage: `url(${imageUrl})`
  };

  return (
    <Container className={classes['project-header']}>
      <Row>
        <Col xs={12} lg={5}>
          {!videoUrl && <div style={divStyle} className={classes['project-image']} />}
          {videoUrl && (
            <ReactPlayer
              className={classes['project-video']}
              controls
              width="100%"
              url={videoUrl}
              post
              config={{ file: { attributes: { poster: imageUrl } } }}
            />
          )}
        </Col>
        <Col xs={12} lg={7}>
          <Row>
            <p className={classes['project-category']}>{category}</p>
          </Row>
          <Row>
            <Col xs={10} lg={10}>
              <h3 className={classes['project-name']}>{name}</h3>
            </Col>
            <Col xs={2} lg={2}>
              <div className={classes['watch-container']}>
                {isAuthorized && (userId === authorId) && (
                <Link to={`${Routes.PROJECTS_EDIT}/${id}`}>
                  <FontAwesomeIcon icon={faCog} size="2x" color={projectPageColors.edit} />
                </Link>
                )}
                <button
                  type='button'
                  onClick={handleWatch}
                  disabled={!isAuthorized}
                  className={classes[`${!isAuthorized && 'disabled'}`]}
                >
                  {isWatched
                    ? <FontAwesomeIcon icon={faBookmarkFilled} size="2x" color={projectPageColors.bookmark} />
                    : <FontAwesomeIcon icon={faBookmarkEmpty} size="2x" color={projectPageColors.bookmark} />}
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={11} lg={11}>
              <p className={classes['project-description']}>{description}</p>
            </Col>
          </Row>
          <Row className={classes['project-social-links-container']}>
            {instagramUrl
              && (
                <a href={instagramUrl} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              )}
            {facebookUrl
              && (
                <a href={facebookUrl} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
                </a>
              )}
            {dribbleUrl
              && (
                <a href={dribbleUrl} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faDribbble} size="2x" />
                </a>
              )}
            <Button
              type="button"
              onClick={() => setShowShareModal(true)}
              icon={<FontAwesomeIcon icon={faShare} />}
              iconPosition="right"
            >
              <span>Share</span>
            </Button>
            <ModalWindow
              show={showShareModal}
              title="Share"
              body={<ShareProjectModal imageUrl={imageUrl} title={name} />}
              size="small"
              centered={false}
              onHide={() => setShowShareModal(false)}
            />
          </Row>
          <Row>
            <ProjectInfo
              id={id}
              donated={donated}
              goal={goal}
              likes={likes}
              dislikes={dislikes}
              bakersAmount={bakersAmount}
              finishDate={finishDate}
              mark={mark}
              isAuthorized={isAuthorized}
              involvementIndex={involvementIndex}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
