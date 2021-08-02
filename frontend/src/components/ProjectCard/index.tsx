import { FC } from 'react';
import classes from './styles.module.scss';
import Tag from '../Tag';
import ProgressBar from '../ProgressBar';
import CardWithLink from '../Card/CardWithLink';

type Props = {
  to: string,
  category: string;
  tags: string[];
  name: string;
  description: string;
  goal: number;
  percent: number;
  image: string;
  rounded?: boolean;
}

const ProjectCard: FC<Props> = ({
  to,
  category,
  tags,
  name,
  description,
  goal,
  percent,
  image,
  rounded = false
}) => (
  <CardWithLink to={to} image={image} rounded={rounded}>
    <div className={classes.category}>{category}</div>
    <div className={classes.title}>{name}</div>
    <div className={classes.description}>{description}</div>

    <div className={classes.tags}>
      {tags.map((tag => <Tag text={tag} />))}
    </div>

    <ProgressBar goal={goal} percent={percent} />
  </CardWithLink>
);

export default ProjectCard;
