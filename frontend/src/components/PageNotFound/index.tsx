import { useLocalization } from '../../providers/localization';
import classes from './styles.module.scss';

const PageNotFound = () => {
  const { t } = useLocalization();

  return (
    <div className={classes.wrapper}>
      <div className={classes.error}>404</div>
      <div className={classes.description}>{t('PAGE NOT FOUND')}</div>
    </div>
  );
};

export default PageNotFound;
