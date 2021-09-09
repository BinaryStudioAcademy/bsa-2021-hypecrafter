import { FC } from 'react';
import LoaderWrapper from '../../components/LoaderWrapper';
import Failure from './component/failure/failure';
import StartPage from './component/startPage/startPage';
import Success from './component/success/success';
import classes from './styles.module.scss';

interface Param{
  type: 'success' | 'failure' | 'show' | 'hide' | 'loading';
}
const Donate: FC<Param> = ({ type }) => {
  const start = <StartPage />;
  const failure = <Failure />;
  const success = <Success />;
  /* eslint-disable */
  const content = type === 'show'
    ? start : (type === 'failure'
      ? failure : type === 'success'
        ? success : false);
  return (
    <div className={classes['donate-page']}>
      <LoaderWrapper isLoading={type === 'loading'} type="spinner" />
      {content}
    </div>
  );
};

export default Donate;
