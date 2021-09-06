import { FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import classes from './styles.module.scss';

type Props = {
  to: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const LinkComponent: FC<Props> = ({ to, children, onClick = () => { } }) => (
  <Link
    className={classes.link}
    to={to}
    onClick={onClick}
  >

    {children}
  </Link>
);

export default LinkComponent;
