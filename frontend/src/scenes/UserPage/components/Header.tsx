import { faDribbble, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { UserProfile } from '../../../common/types';
import Button from '../../../components/Button';
import Counter from '../../../components/Counter';
import Input from '../../../components/Input';
import { useLocalization } from '../../../providers/localization';
import classes from '../styles.module.scss';

interface HeaderProps {
  userProfile: UserProfile;
  isEditing: boolean;
  setEditing: (value: boolean) => void;
  updateUser: (updatedUser: UserProfile) => void;
}

const Header: FunctionComponent<HeaderProps> = ({ userProfile, isEditing, setEditing, updateUser }) => {
  const {
    firstName,
    lastName,
    email,
    region,
    description,
    rating,
    instagramUrl,
    facebookUrl,
    dribbleUrl
  } = userProfile;
  const { t } = useLocalization();

  const [editFirstName, setEditFirstName] = useState(firstName);
  const [editLastName, setEditLastName] = useState(lastName);
  const [editRegion, setEditRegion] = useState(region);
  const [editDescription, setEditDescription] = useState(description);

  const updatedUserProfile = {
    ...userProfile,
    firstName: editFirstName,
    lastName: editLastName,
    region: editRegion,
    description: editDescription
  };

  const enableEditHandler = () => setEditing(true);
  const cancelEditHandler = () => {
    setEditing(false);
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setEditRegion(region);
    setEditDescription(description);
  };
  const submitEditHandler = () => updateUser(updatedUserProfile);

  const editNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fullName = e.currentTarget.value.split(' ');
    setEditFirstName(fullName[0]);
    setEditLastName(fullName[1]);
  };
  const editRegionHandler = (e: ChangeEvent<HTMLInputElement>) => setEditRegion(e.currentTarget.value);
  const editDescriptionHandler = (e: ChangeEvent<HTMLInputElement>) => setEditDescription(e.currentTarget.value);

  return (
    <Container className={classes['header-container']}>
      <Row className="align-items-md-end">
        <Col md={12} lg={3} xl={2} className={`text-center ${classes['avatar-column']}`}>
          <Image src="https://source.unsplash.com/800x600/?portrait" roundedCircle className={classes['user-avatar']} />
        </Col>
        <Col md={12} lg={5} xl={4} className="text-md-left">
          <div className={classes['user-info']}>
            <div className={classes['user-name']}>
              {isEditing
                ? <Input value={`${editFirstName} ${editLastName}`} onChange={editNameHandler} />
                : (
                  <div>
                    {`${firstName} ${lastName}`}
                    <button type='button' className={classes['user-edit-btn']} onClick={enableEditHandler}>
                      <FontAwesomeIcon icon={faUserEdit} className={classes['user-edit-icon']} />
                    </button>
                  </div>
                )}
            </div>
            <div className={classes['user-email']}>
              {isEditing
                ? <Input value={email} disabled />
                : <p>{email}</p>}
            </div>
            <div>
              {isEditing
                ? <Input value={editRegion} onChange={editRegionHandler} />
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
          <div className={`${classes['user-about-me']} ${isEditing && classes.editing}`}>
            <h3>About Me</h3>
            {isEditing
              ? <Input type='textarea' value={editDescription} onChange={editDescriptionHandler} />
              : <p>{description}</p>}
          </div>
        </Col>
        <Col md={12} lg={4} xl={2}>
          {!isEditing && (
            <div className={classes['user-rating']}>
              <Counter to={Number(rating)} label={t('Rating')} />
            </div>
          )}
        </Col>
      </Row>
      <Row>
        {isEditing && (
          <div className={classes['edit-submit-btns']}>
            <Button type="button" variant="primary" outline onClick={cancelEditHandler}>{t('Cancel')}</Button>
            <Button type="button" variant="primary" onClick={submitEditHandler}>
              {t('Edit')}
            </Button>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Header;
