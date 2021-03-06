import { faBehance, faDribbble, faFacebookSquare, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { UserProfile } from '../../../common/types';
import Avatar from '../../../components/Avatar';
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
    dribbleUrl,
    pinterestUrl,
    behanceUrl
  } = userProfile;
  const { t } = useLocalization();

  const [editFirstName, setEditFirstName] = useState(firstName);
  const [editLastName, setEditLastName] = useState(lastName);
  const [editRegion, setEditRegion] = useState(region);
  const [editDescription, setEditDescription] = useState(description);
  const [editInstagramUrl, setEditInstagramUrl] = useState(instagramUrl);
  const [editFacebookUrl, setEditFacebookUrl] = useState(facebookUrl);
  const [editDribbleUrl, setEditDribbleUrl] = useState(dribbleUrl);
  const [editPinterestUrl, setEditPinterestUrl] = useState(pinterestUrl);
  const [editBehanceUrl, setEditBehanceUrl] = useState(behanceUrl);

  const updatedUserProfile = {
    ...userProfile,
    firstName: editFirstName,
    lastName: editLastName,
    region: editRegion,
    description: editDescription,
    instagramUrl: editInstagramUrl,
    facebookUrl: editFacebookUrl,
    dribbleUrl: editDribbleUrl,
    pinterestUrl: editPinterestUrl,
    behanceUrl: editBehanceUrl
  };

  const enableEditHandler = () => setEditing(true);
  const cancelEditHandler = () => {
    setEditing(false);
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setEditRegion(region);
    setEditDescription(description);
    setEditInstagramUrl(instagramUrl);
    setEditFacebookUrl(facebookUrl);
    setEditDribbleUrl(dribbleUrl);
    setEditPinterestUrl(pinterestUrl);
    setEditBehanceUrl(behanceUrl);
  };
  const submitEditHandler = () => {
    setEditing(false);
    updateUser(updatedUserProfile);
  };

  const editFirstNameHandler = (e: ChangeEvent<HTMLInputElement>) => setEditFirstName(e.currentTarget.value);
  const editLastNameHandler = (e: ChangeEvent<HTMLInputElement>) => setEditLastName(e.currentTarget.value);
  const editRegionHandler = (e: ChangeEvent<HTMLInputElement>) => setEditRegion(e.currentTarget.value);
  const editDescriptionHandler = (e: ChangeEvent<HTMLInputElement>) => setEditDescription(e.currentTarget.value);
  const editInstagramUrlHandler = (e: ChangeEvent<HTMLInputElement>) => setEditInstagramUrl(e.currentTarget.value);
  const editFacebookUrlHandler = (e: ChangeEvent<HTMLInputElement>) => setEditFacebookUrl(e.currentTarget.value);
  const editDribbleUrlHandler = (e: ChangeEvent<HTMLInputElement>) => setEditDribbleUrl(e.currentTarget.value);
  const editPinterestUrlHandler = (e: ChangeEvent<HTMLInputElement>) => setEditPinterestUrl(e.currentTarget.value);
  const editBehanceUrlHandler = (e: ChangeEvent<HTMLInputElement>) => setEditBehanceUrl(e.currentTarget.value);

  return (
    <Container className={classes['header-container']}>
      <Row className="align-items-md-end">
        <Col md={12} lg={3} xl={2} className={`text-center ${classes['avatar-column']}`}>
          <Avatar userName={`${editFirstName} ${editLastName}`} width={190} />
        </Col>
        <Col md={12} lg={5} xl={4} className="text-md-left">
          <div className={classes['user-info']}>
            <div className={classes['user-name']}>
              {isEditing
                ? (
                  <>
                    <Input
                      id='name'
                      label='Your First Name'
                      value={`${editFirstName}`}
                      onChange={editFirstNameHandler}
                    />
                    <Input
                      id='name'
                      label='Your Last Name'
                      value={`${editLastName}`}
                      onChange={editLastNameHandler}
                    />
                  </>
                )
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
                ? <Input id='email' label='Email' value={email} disabled />
                : <p>{email}</p>}
            </div>
            <div>
              {isEditing
                ? <Input id='region' label='Region' value={editRegion} onChange={editRegionHandler} />
                : (
                  <>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span className={classes['user-city']}>{region}</span>
                  </>
                )}
            </div>
            {isEditing
              ? (
                <>
                  <Input
                    id='instagram'
                    label='Instagram'
                    value={editInstagramUrl}
                    onChange={editInstagramUrlHandler}
                  />
                  <Input
                    id='facebook'
                    label='Facebook'
                    value={editFacebookUrl}
                    onChange={editFacebookUrlHandler}
                  />
                  <Input
                    id='dribble'
                    label='Dribble'
                    value={editDribbleUrl}
                    onChange={editDribbleUrlHandler}
                  />
                  <Input
                    id='pinterest'
                    label='Pinterest'
                    value={editPinterestUrl}
                    onChange={editPinterestUrlHandler}
                  />
                  <Input
                    id='behance'
                    label='Behance'
                    value={editBehanceUrl}
                    onChange={editBehanceUrlHandler}
                  />
                </>
              )
              : (
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
                  {pinterestUrl
                    && (
                      <a href={dribbleUrl} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faPinterest} size="2x" />
                      </a>
                    )}
                  {behanceUrl
                  && (
                    <a href={dribbleUrl} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faBehance} size="2x" />
                    </a>
                  )}
                </div>
              )}

          </div>
        </Col>
        <Col md={12} xl={4} lg={{ order: 'last' }} className={`${isEditing && classes['column-editing']}`}>
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
              {t('Update')}
            </Button>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Header;
