import { FC } from 'react';
import { Col } from 'react-bootstrap';
import { сutWord } from '../../../../../../helpers';
import { ProjectItem } from '../../../../interfaces';
import classes from './style.module.scss';

interface LabelProps {
  project: ProjectItem;
  color: string;
}

const Label: FC<LabelProps> = ({ project, color }) => (
  <Col className={classes.item}>
    <div className={classes['color-wrapper']}>
      <div style={{ background: color }} className={classes['color-box']} />
    </div>
    <div className={classes['text-wrapper']}>
      <p className={classes.name}>{сutWord(project.name, 22)}</p>
      <p className={classes.data}>{`${project.views} views`}</p>
    </div>
  </Col>
);

export default Label;
