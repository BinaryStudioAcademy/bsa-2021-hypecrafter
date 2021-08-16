import { FC } from 'react';
import CardWithLink from '../Card/CardWithLink';
import ProgressBar from '../ProgressBar';
import Tag from '../Tag';
import classes from './styles.module.scss';

type Props = {
  to: string,
  category?: string;
  tags: string[];
  name: string;
  description: string;
  goal: number;
  percent: number;
  image: string;
  rounded?: boolean;
};

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
      {tags.map(tag => <Tag key={tag} text={tag} />)}
    </div>

    <ProgressBar goal={goal} percent={percent} />
  </CardWithLink>
);

export default ProjectCard;
