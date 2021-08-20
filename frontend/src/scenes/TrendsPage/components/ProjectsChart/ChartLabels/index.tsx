import { FC } from 'react';
import { Row } from 'react-bootstrap';
import { randomBrightColor } from '../../../../../helpers';
import { ProjectItem } from '../../../interfaces';
import Label from './Label';
import classes from './style.module.scss';

interface ChartLabelsProps {
  projects: ProjectItem[];
  t: CallableFunction;
}

const ChartLabels: FC<ChartLabelsProps> = ({ projects, t }) => {
  const colors = randomBrightColor(projects.length);
  return (
    <Row className={classes['chart-labels']}>
      {projects.map((el, i) => (
        <Label key={el.id} project={el} color={colors[i]} t={t} />
      ))}
    </Row>
  );
};

export default ChartLabels;
