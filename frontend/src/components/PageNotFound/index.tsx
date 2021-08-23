import { useLocalization } from '../../providers/localization';
import Seo from '../Seo';
import classes from './styles.module.scss';

const PageNotFound = () => {
  const { t } = useLocalization();

  return (
    <div className={classes.wrapper}>
      <Seo
        title={`${t('Page not found')} - HypeCrafter`}
        description={`${t('The page you were looking for doesn’t exist (404)')}`}
        metas={{
          'og:title': `${t('Page not found')} - HypeCrafter`,
          'og:description': `${t('The page you were looking for doesn’t exist (404)')}`
        }}
      />

      <div className={classes.error}>404</div>
      <div className={classes.description}>{t('PAGE NOT FOUND')}</div>
    </div>
  );
};

export default PageNotFound;
