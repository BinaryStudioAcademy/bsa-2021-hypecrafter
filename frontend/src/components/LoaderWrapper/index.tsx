import classnames from 'classnames';
import { FC } from 'react';
import Logo from '../Logo';
import classes from './styles.module.scss';

interface Props {
  isLoading: boolean;
  variant?: 'default' | 'page';
}

const LoaderWrapper: FC<Props> = ({ isLoading, variant = 'default', children }) => (
  <>
    {isLoading && <div className={classnames(classes['loader-wrapper'], classes[`loader-${variant}`])}><Logo /></div>}
    {!isLoading && children}
  </>
);

export default LoaderWrapper;
