import { FC } from 'react';
import projectImg from '../../assets/project-placeholder.jpg';
import CardWithLink from '../Card/CardWithLink';
import ProgressBar from '../ProgressBar';
import Tag from '../Tag';
import classes from './styles.module.scss';

type Props = {
  to: string,
  tags: string[] | string;
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
  tags = '',
  name,
  description,
  goal,
  percent,
  category,
  image = projectImg,
  rounded = false
}) => {
  const hide = () => {
    if (!tags) return true;
    if (Array.isArray(tags) && !tags.length) return true;
    if (typeof tags === 'string' && (!tags.trim() || tags.trim() === 'null')) return true;
    return false;
  };

  return (
    <CardWithLink to={to} image={image} rounded={rounded}>
      {category && <div className={classes.category}>{category}</div>}
      <div className={classes.title}>{name}</div>
      <div className={classes.description}>{description}</div>

      <div
        className={`
        ${classes.tags}
        ${hide() ? classes.hide : ''}
      `}
      >
        {
          Array.isArray(tags)
            ? tags.map(tag => tag !== null && <Tag key={tag} text={tag} />)
            : <Tag text={tags} />
        }
      </div>

      <ProgressBar goal={Math.floor(goal)} percent={Math.floor(percent)} />
    </CardWithLink>
  );
};

export default ProjectCard;
