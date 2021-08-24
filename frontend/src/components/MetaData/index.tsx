import { Helmet } from 'react-helmet';

const MetaData = () => {
  const siteName = 'HypeCrafter';
  const title = 'It\'s faithful assistant';
  const siteDescription = `Do you have a good and well thought-out idea and
    are you ready to conquer the peaks alone to make your dream come true?
    But sometimes, alone, the difficult path from concept to finished product
    is not easy at all. HypeCrafter will lend a helping hand, and more than one!`;
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
