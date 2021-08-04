import { FC } from 'react';
import { Link } from 'react-router-dom';
import classes from './styles.module.scss';

type Props = {
  to: string;
};

const LinkComponent: FC<Props> = ({ to, children }) => (
  <Link className={classes.link} to={to}>
    {children}
  </Link>
);

export default LinkComponent;
