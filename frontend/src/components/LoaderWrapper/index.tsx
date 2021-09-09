import classnames from 'classnames';
import { FC } from 'react';
import Logo from '../Logo';
import classes from './styles.module.scss';

interface Props {
  isLoading: boolean;
  variant?: 'default' | 'page';
  type?: 'logo' | 'spinner';
  isTransparent?: boolean;
}

const Spinner = () => <div className={classes.spinner} />;

const LoaderWrapper: FC<Props> = ({
  isLoading,
  variant = 'default',
  children,
  type = 'logo',
  isTransparent = false,
}) => (
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
    {(!isLoading || isTransparent) && children}
  </>
);

export default LoaderWrapper;
