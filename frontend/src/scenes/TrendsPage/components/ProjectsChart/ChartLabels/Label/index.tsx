import { FC } from 'react';
import { сutWord } from '../../../../../../helpers';
import { ProjectItem } from '../../../../interfaces';
import classes from './style.module.scss';

interface LabelProps {
  project: ProjectItem;
  color: string;
}

const Label: FC<LabelProps> = ({ project, color }) => (
  <div className={classes.item}>
    <div className={classes['color-wrapper']}>
      <div style={{ background: color }} className={classes['color-box']} />
    </div>
    <div>
      <div className={classes.name}>{сutWord(project.name, 22)}</div>
      <div className={classes.data}>{`${project.views} views`}</div>
    </div>
  </div>
);

export default Label;
