import { FC } from 'react';
import { Col } from 'react-bootstrap';
import { ProjectNameMaxLength } from '../../../../../../common/constans';
import { сutWord } from '../../../../../../helpers';
import { ProjectItem } from '../../../../interfaces';
import classes from './style.module.scss';

interface LabelProps {
  project: ProjectItem;
  color: string;
  t: CallableFunction;
}

const Label: FC<LabelProps> = ({ project, color, t }) => (
  <Col className={classes.item}>
    <div className={classes['color-wrapper']}>
      <div style={{ background: color }} className={classes['color-box']} />
    </div>
    <div className={classes['text-wrapper']}>
      <p className={classes.name}>{сutWord(project.name, ProjectNameMaxLength)}</p>
      <p className={classes.data}>{`${project.views} ${t('views')}`}</p>
    </div>
  </Col>
);

export default Label;
