import { FC } from 'react';
import classes from './styles.module.scss';

const TextStyleExample: FC = () => {
  const text = 'This is testing heading text';

  return (
    <div className={classes.wrapper}>
      <div className={classes.item}>
        <p className={classes['heading-mini']}>{text}</p>
        <p className={classes['heading-sm']}>{text}</p>
        <p className={classes['heading-md']}>{text}</p>
        <p className={classes['heading-lg']}>{text}</p>
        <p className={classes['heading-xl']}>{text}</p>
        <p className={classes['heading-xxl']}>{text}</p>
      </div>
      <div className={classes.item}>
        <p className={classes['text-mini']}>{text}</p>
        <p className={classes['text-sm']}>{text}</p>
        <p className={classes['text-sm-bold']}>{text}</p>
        <p className={classes['text-md']}>{text}</p>
        <p className={classes['text-md-bold']}>{text}</p>
        <p className={classes['text-xl']}>{text}</p>
      </div>
    </div>
  );
};

export default TextStyleExample;
