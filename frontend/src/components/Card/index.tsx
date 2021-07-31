import { FC } from 'react';
import cn from 'classnames';
import classes from './styles.module.scss';
import Tag from '../Tag';
import ProgressBar from '../ProgressBar';

type Props = {
  category: string;
  tags: string[];
  name: string;
  description: string;
  goal: number;
  percent: number;
  image: string;
  rounded?: boolean;
}

const CardComponent: FC<Props> = ({
  category,
  tags,
  name,
  description,
  goal,
  percent,
  image,
  rounded = false
}) => (
  <article className={cn(classes.card, { [classes.rounded]: rounded })}>
    <div className={classes['card-image']}>
      <img src={image} alt="card img" />
    </div>

    <div className={classes['card-content']}>
      <div className={classes.category}>{category}</div>
      <div className={classes.title}>{name}</div>
      <div className={classes.description}>{description}</div>

      <div className={classes.tags}>
        {tags.map((tag => <Tag text={tag} />))}
      </div>

      <ProgressBar goal={goal} percent={percent} />
    </div>
  </article>
);

export default CardComponent;
