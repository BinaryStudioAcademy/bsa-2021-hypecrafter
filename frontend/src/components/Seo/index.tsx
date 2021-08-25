import { FC } from 'react';
import { Helmet } from 'react-helmet';

type Props = {
  title: string;
  description: string;
  metas?: Record<string, string>;
};

const Seo: FC<Props> = ({ title, description, metas }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {metas && Object.entries(metas).map(([metaName, metaValue]) => (
      <meta
        key={metaName}
        name={metaName}
        content={metaValue}
      />
    ))}
  </Helmet>
);

export default Seo;
