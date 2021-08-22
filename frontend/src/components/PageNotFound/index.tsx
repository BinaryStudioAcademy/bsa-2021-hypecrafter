import { Helmet } from 'react-helmet';
import { useLocalization } from '../../providers/localization';
import classes from './styles.module.scss';

const PageNotFound = () => {
  const { t } = useLocalization();

  return (
    <div className={classes.wrapper}>
      <Helmet>
        <title>{`${t('The page you were looking for doesn’t exist (404)')} - HypeCrafter`}</title>
      </Helmet>

      <div className={classes.error}>404</div>
      <div className={classes.description}>{t('PAGE NOT FOUND')}</div>
    </div>
  );
};

export default PageNotFound;
