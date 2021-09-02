import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import classes from './style.module.scss';

interface CardProps {
  title: string;
  value: string;
}

const Card: FC<CardProps> = ({ title, value }) => (
  <Col className={classes['statistics-card']}>
    <Row className={classes['statistics-card-title']}>{title}</Row>
    <Row className={classes['statistics-card-value']}>{value}</Row>
  </Col>
);

export default Card;
