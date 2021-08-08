import { FunctionComponent } from 'react';
import { Image } from 'react-bootstrap';
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
    <div className={classes['header-container']}>
      <Image src="https://source.unsplash.com/800x600/?portrait" roundedCircle className={classes['user-avatar']} />
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

      <div className={classes['user-about-me']}>
        <h3>About Me</h3>
        <p>
          {aboutMe}
        </p>
      </div>

      <div className={classes['user-rating']}>
        <h3>Rating</h3>
        <span>{rating}</span>
      </div>
    </div>
  );
};

export default Header;
