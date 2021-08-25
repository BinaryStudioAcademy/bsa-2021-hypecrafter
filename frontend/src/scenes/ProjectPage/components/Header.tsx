import { faDribbble, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import { faBookmark as faBookmarkFilled } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkEmpty } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { ProjectPage } from '../../../common/types';
import ProjectInfo from '../../../components/ProjectInfo';
import classes from '../styles.module.scss';

interface HeaderProps {
  project: ProjectPage;
}

const Header: FunctionComponent<HeaderProps> = ({ project }) => {
  const {
    id,
    name,
    description,
    category,
    imageUrl,
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
    mark
  } = project;
  // const [isFavorite, setFavorite] = useState(false);
  return (
    <Container className={classes['project-header']}>
      <Row>
        <Col xs={12} lg={5}>
          <Image src={imageUrl} className={classes['project-image']} />
        </Col>
        <Col xs={12} lg={7}>
          <Row>
            <p className={classes['project-category']}>{category}</p>
          </Row>
          <Row>
            <Col xs={11} lg={11}>
              <h3 className={classes['project-name']}>{name}</h3>
            </Col>
            <Col xs={1} lg={1}>
              <FontAwesomeIcon icon={faBookmarkEmpty} size="2x" />
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
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
