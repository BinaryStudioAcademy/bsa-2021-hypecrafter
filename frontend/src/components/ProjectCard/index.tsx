import { FC } from 'react';
import CardWithLink from '../Card/CardWithLink';
import ProgressBar from '../ProgressBar';
import Tag from '../Tag';
import classes from './styles.module.scss';

type Props = {
  to: string,
  tags: string[] | string; // temp
  name: string;
  description: string;
  goal: number;
  percent: number;
  category?: string;
  image?: string;
  rounded?: boolean;
};

const ProjectCard: FC<Props> = ({
  to,
  tags,
  name,
  description,
  goal,
  percent,
  category,
  image = 'https://dummyimage.com/600x400/000/fff.jpg&text=+',
  rounded = false
}) => (
  <CardWithLink to={to} image={image} rounded={rounded}>
    {category && <div className={classes.category}>{category}</div>}
    <div className={classes.title}>{name}</div>
    <div className={classes.description}>{description}</div>

    <div className={classes.tags}>
      {(Array.isArray(tags))
        ? tags.map(tag => <Tag key={tag} text={tag} />)
        : <Tag text={tags} />}
    </div>

    <ProgressBar goal={Math.floor(goal)} percent={Math.floor(percent)} />
  </CardWithLink>
);

export default ProjectCard;
