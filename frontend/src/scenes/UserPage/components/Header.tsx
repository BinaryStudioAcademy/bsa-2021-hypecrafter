import { faDribbble, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { UserProfile } from '../../../common/types';
import Counter from '../../../components/Counter';
import Input from '../../../components/Input';
import { useLocalization } from '../../../providers/localization';
import classes from '../styles.module.scss';

interface HeaderProps {
  userProfile: UserProfile;
  editing: boolean;
  setEditing: (value: boolean) => void;
}

const Header: FunctionComponent<HeaderProps> = ({ userProfile, editing, setEditing }) => {
  const {
    firstName,
    lastName,
    region,
    description,
    rating,
    instagramUrl,
    facebookUrl,
    dribbleUrl
  } = userProfile;
  const { t } = useLocalization();

  const editHandler = () => setEditing(!editing);

  return (
    <Container className={classes['header-container']}>
      <Row className="align-items-md-end">
        <Col md={12} lg={3} xl={2} className={`text-center ${classes['avatar-column']}`}>
          <Image src="https://source.unsplash.com/800x600/?portrait" roundedCircle className={classes['user-avatar']} />
        </Col>
        <Col md={12} lg={5} xl={4} className="text-md-left">
          <div className={classes['user-info']}>
            <div className={classes['user-name']}>
              {editing
                ? <Input value={`${firstName} ${lastName}`} />
                : (
                  <div>
                    {`${firstName} ${lastName}`}
                    <button type='button' className={classes['user-edit-btn']} onClick={editHandler}>
                      <FontAwesomeIcon icon={faUserEdit} className={classes['user-edit-icon']} />
                    </button>
                  </div>
                )}
            </div>
            <div className={classes['user-spec']}>
              {editing
                ? <Input value='Specialty' />
                : <p>Specialty</p>}
            </div>
            <div>
              {editing
                ? <Input value={region} />
                : (
                  <>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span className={classes['user-city']}>{region}</span>
                  </>
                )}
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
          <div className={`${classes['user-about-me']} ${editing && classes.editing}`}>
            <h3>About Me</h3>
            {editing
              ? <Input type='textarea' value={description} />
              : <p>{description}</p>}
          </div>
        </Col>
        <Col md={12} lg={4} xl={2}>
          {!editing && (
            <div className={classes['user-rating']}>
              <Counter to={Number(rating)} label={t('Rating')} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
