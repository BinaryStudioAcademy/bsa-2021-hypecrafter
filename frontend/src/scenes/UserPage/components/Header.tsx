import { FunctionComponent } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faDribbble } from '@fortawesome/free-brands-svg-icons';
import { User } from '../interfaces';
import classes from '../styles.module.scss';

interface HeaderProps {
  user: User;
}

const Header: FunctionComponent<HeaderProps> = ({ user }) => {
  const {
    firstName,
    secondName,
    location,
    speciality,
    aboutMe,
    rating,
    instagramUrl,
    facebookUrl,
    dribbleUrl
  } = user;

  return (
    <Container className={classes['header-container']}>
      <Row className="align-items-md-end">
        <Col md={12} lg={3} xl={2} className="text-center">
          <Image src="https://source.unsplash.com/800x600/?portrait" roundedCircle className={classes['user-avatar']} />
        </Col>
        <Col md={12} lg={5} xl={4} className="text-md-left">
          <div className={classes['user-info']}>
            <p className={classes['user-name']}>{`${firstName} ${secondName}`}</p>
            <p className={classes['user-spec']}>{speciality}</p>
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span className={classes['user-city']}>{location}</span>
            </div>
            <div className={classes['user-links']}>
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
            </div>
          </div>
        </Col>
        <Col md={12} xl={4} lg={{ order: 'last' }}>
          <div className={classes['user-about-me']}>
            <h3>About Me</h3>
            <p>
              {aboutMe}
            </p>
          </div>
        </Col>
        <Col md={12} lg={4} xl={2}>
          <div className={classes['user-rating']}>
            <h3>Rating</h3>
            <span>{rating}</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
