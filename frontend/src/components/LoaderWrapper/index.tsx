import classnames from 'classnames';
import { FC } from 'react';
import Logo from '../Logo';
import classes from './styles.module.scss';

interface Props {
  isLoading: boolean;
  variant?: 'default' | 'page';
  type?: 'logo' | 'spinner';
}

const Spinner = () => <div className={classes.spinner} />;

const LoaderWrapper: FC<Props> = ({ isLoading, variant = 'default', children, type = 'logo' }) => (
  <>
    {isLoading && (
      <div
        className={classnames(
          classes['loader-wrapper'],
          classes[`loader-${variant}`]
        )}
      >
        {type === 'logo' ? <Logo /> : <Spinner />}
      </div>
    )}
    {!isLoading && children}
  </>
);

export default LoaderWrapper;
