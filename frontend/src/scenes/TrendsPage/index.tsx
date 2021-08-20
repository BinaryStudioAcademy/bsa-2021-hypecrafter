import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import LoaderWrapper from '../../components/LoaderWrapper';
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
    isLoadingBottom,
    isLoadingTop
  } = useTypedSelector(({ trendsPage }) => ({
    tags: trendsPage.tags,
    categories: trendsPage.categories,
    isLoadingBottom: trendsPage.isLoadingBottom,
    isLoadingTop: trendsPage.isLoadingTop
  }));

  useEffect(() => {
    fetchPopularTagsAction();
    fetchCategories();
  }, []);

  const defaultParams = getTagsOptions(popularTags, t);

  return (
    <div className={classes.wrapper}>
      <Container className={classes['trends-container']}>
        <LoaderWrapper isLoading={isLoadingTop} variant='page'>
          <TagsChart defaultParams={defaultParams} t={t} />
        </LoaderWrapper>
        <LoaderWrapper isLoading={isLoadingBottom} variant='page'>
          <ProjectsChart categories={categories} t={t} />
        </LoaderWrapper>
      </Container>
    </div>
  );
};

export default TrendsPage;
