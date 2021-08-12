import classes from './styles.module.scss';

const PageNotFound = () => (
  <div className={classes.wrapper}>
    <div className={classes.error}>404</div>
    <div className={classes.description}>PAGE NOT FOUND</div>
  </div>
);

export default PageNotFound;
