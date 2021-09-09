import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import LoaderWrapper from '../../components/LoaderWrapper';
import Seo from '../../components/Seo';
import { useAction, useTypedSelector } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import { ProjectsChart, TagsChart } from './components';
import { getTagsOptions } from './options';
import classes from './styles.module.scss';

const TrendsPage: FC = () => {
  const { t } = useLocalization();
  const { fetchPopularTagsAction, fetchCategories } = useAction();
  const {
    tags: popularTags,
    categories,
    isLoading
  } = useTypedSelector(({ trendsPage }) => ({
    tags: trendsPage.tags,
    categories: trendsPage.categories,
    isLoading: trendsPage.isLoading
  }));

  useEffect(() => {
    fetchPopularTagsAction();
    fetchCategories();
  }, []);

  const defaultParams = getTagsOptions(popularTags, t);

  return (
    <div className={classes.wrapper}>
      <Seo
        title={`${t('Trends')} - HypeCrafter`}
        description=""
      />

      <Container className={classes['trends-container']}>
        <LoaderWrapper isLoading={isLoading} variant="page" isTransparent>
          <TagsChart defaultParams={defaultParams} t={t} />
          <ProjectsChart categories={categories} t={t} />
        </LoaderWrapper>
      </Container>
    </div>
  );
};

export default TrendsPage;
