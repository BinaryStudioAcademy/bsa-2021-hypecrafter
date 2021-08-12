import { Languages } from '../../common/enums';
import { useLocalization } from '../../providers/localization';
import classes from './styles.module.scss';
import Description404 from './translations';

const PageNotFound = () => {
  const { selectedLanguage } = useLocalization();
  const description = Description404[selectedLanguage as Languages];

  return (
    <div className={classes.wrapper}>
      <div className={classes.error}>404</div>
      <div className={classes.description}>{description}</div>
    </div>
  );
};

export default PageNotFound;
