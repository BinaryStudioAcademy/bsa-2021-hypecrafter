import { FC } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './styles.module.scss';

interface Props {
  to: string;
  category: string;
  tags: string[];
  name: string;
  description: string;
  goal: number;
  percent: number;
  image: string;
}

const CardComponent: FC<Props> = ({
  to,
  category,
  tags,
  name,
  description,
  goal,
  percent,
  image
}) => (
  <Link className={classes.link} to={to}>
    <div className={classes.card}>
      <div className={classes.cardImage}>
        <img src={image} alt="card img" />
      </div>

      <div className={classes.cardContent}>
        <div className={classes.category}>{category}</div>
        <div className={classes.title}>{name}</div>
        <div className={classes.description}>{description}</div>

        <div className={classes.tags}>
          {tags.map((tag => (
            <div className={classes.tag}>
              {tag}
            </div>
          )))}
        </div>

        <div className={classes.progress}>
          <div className={classes.progressInfo}>
            <div className={classes.goal}>{`$ ${goal}`}</div>
            <div className={classes.percent}>{`${percent}%`}</div>
          </div>
          <ProgressBar className={classes.progressBar} now={percent} label={`${percent}%`} visuallyHidden />
        </div>
      </div>
    </div>
  </Link>
);

export default CardComponent;
