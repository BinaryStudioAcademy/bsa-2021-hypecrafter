import { FC, ReactNode } from 'react';
import cn from 'classnames';
import classes from './styles.module.scss';

type Props = {
  children: ReactNode;
  image: string;
  rounded?: boolean;
}

const CardComponent: FC<Props> = ({
  children,
  image,
  rounded = false
}) => (
  <article className={cn(classes.card, { [classes.rounded]: rounded })}>
    <div className={classes['card-image']}>
      <img src={image} alt="card img" />
    </div>

    <div className={classes['card-content']}>
      {children}
    </div>
  </article>
);

export default CardComponent;
