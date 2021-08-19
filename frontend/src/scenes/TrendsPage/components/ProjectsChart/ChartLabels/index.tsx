import { FC } from 'react';
import { randomBrightColor } from '../../../../../helpers';
import { ProjectItem } from '../../../interfaces';
import Label from './Label';
import classes from './style.module.scss';

interface ChartLabelsProps {
  projects: ProjectItem[];
}

const ChartLabels: FC<ChartLabelsProps> = ({ projects }) => {
  const colors = randomBrightColor(projects.length);
  return (
    <div className={classes['chart-labels']}>
      {projects.map((el, i) => (
        <Label key={el.id} project={el} color={colors[i]} />
      ))}
    </div>
  );
};

export default ChartLabels;
