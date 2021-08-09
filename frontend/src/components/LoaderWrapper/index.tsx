import { FC } from 'react';
import Logo from '../Logo';
import classes from './styles.module.scss';

interface Props {
  isLoading: boolean;
}

const LoaderWrapper: FC<Props> = ({ isLoading, children }) => (
  <>
    {isLoading && <div className={classes['loader-wrapper']}><Logo /></div>}
    {!isLoading && children}
  </>
);

export default LoaderWrapper;
