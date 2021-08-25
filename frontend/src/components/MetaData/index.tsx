import { Helmet } from 'react-helmet';
import { useLocalization } from '../../providers/localization';

const MetaData = () => {
  const { t } = useLocalization();

  const siteName = 'HypeCrafter';
  const title = t('Social title');
  const siteDescription = t('Agreement');
  const logoLink = 'http://hypecrafter2-env.eba-n3gbu5mb.us-west-2.elasticbeanstalk.com/HypeCoin.png';
  const link = 'http://hypecrafter2-env.eba-n3gbu5mb.us-west-2.elasticbeanstalk.com';

  return (
    <Helmet>
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={siteDescription} />
      <meta property='og:image' content={logoLink} />
      <meta property='og:url' content={link} />
    </Helmet>
  );
};

export default MetaData;
