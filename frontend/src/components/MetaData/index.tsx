import { Helmet } from 'react-helmet';
import { useLocalization } from '../../providers/localization';

const MetaData = () => {
  const { t } = useLocalization();

  const siteName = 'HypeCrafter';
  const title = t('Social title');
  const siteDescription = t('Agreement');
  const link = 'http://hypecrafter2-env.eba-n3gbu5mb.us-west-2.elasticbeanstalk.com';
  const logoLink = () => {
    switch (t('language')) {
      case 'uk':
        return 'http://s1.litepic.ru/121082524d7bdd3f6f2bc8898345.png';
      default:
        return 'http://s1.litepic.ru/121082524293df507f813f618cae.png';
    }
  };

  return (
    <Helmet>
      <meta property='og:locale' content={t('Site locale')} />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={siteDescription} />
      <meta property='og:image' content={logoLink()} />
      <meta property='og:url' content={link} />
    </Helmet>
  );
};

export default MetaData;
