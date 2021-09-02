import { FC } from 'react';
import { Col } from 'react-bootstrap';
import { getCardText } from '../helper';
import classes from './style.module.scss';

interface CardProps {
  title: string;
  value: string;
}

const Card: FC<CardProps> = ({ title, value }) => (
  <Col xs={4} md={3} lg={2} className={classes['statistics-card']}>
    <div className={classes['statistics-card-title']}>{getCardText(title)}</div>
    <div className={classes['statistics-card-value']}>{value}</div>
  </Col>
);

export default Card;
