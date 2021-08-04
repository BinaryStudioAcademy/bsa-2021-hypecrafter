import { FC } from 'react';
import classes from './styles.module.scss';

type Props = {
  text: string;
};

const Tag: FC<Props> = ({ text }) => (
  <div className={classes.tag}>
    {text}
  </div>
);

export default Tag;
