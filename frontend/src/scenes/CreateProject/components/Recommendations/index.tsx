import { FC, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Routes } from '../../../../common/enums';
import { CreateProjectTag } from '../../../../common/types';
import { useAction, useTypedSelector } from '../../../../hooks';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage } from '../../enums';
import { RecommendedProject } from '../../types';
import Layout from '../Layout';
import RecommendationCard from '../RecommendationCard';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage: CurrentPage,
  region: string,
  category: string,
  projectTags: CreateProjectTag[],
}

const Recommendations: FC<Props> = ({ changePage, currentPage, region, category, projectTags }) => {
  const { t } = useLocalization();
  const { fetchRecommendedProjectsAction } = useAction();
  const recommendedProjects = useTypedSelector(state => state.project.recommendedProjects);
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(CurrentPage.END);

  useEffect(() => {
    fetchRecommendedProjectsAction({
      category,
      region,
      projectTags: projectTags.reduce<string[]>((res, item) => (item.tag.id ? [...res, item.tag.id] : res), [])
    });
  }, []);

  const body = (
    <div>
      <p className={classes.title}>{t('Let’s look at similar projects')}</p>
      <div className={classes.projects}>
        {recommendedProjects.map((proj: RecommendedProject) => (
          <RecommendationCard
            key={proj.id}
            to={`${Routes.PROJECTS}/${proj.id}`}
            category={proj.categoryName}
            tags={proj.tags}
            name={proj.name}
            goal={proj.goal}
            percent={(proj.donated * 100) / proj.goal}
            image={proj.imageUrl}
            totalViews={proj.totalViews}
            isSuccess={proj.isSuccess}
            isActive={proj.isActive}
          />
        ))}
      </div>
    </div>
  );

  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleBack} className={classes.back}>{t('Go back')}</Button>
      <Button onClick={handleNext}>{t('Save')}</Button>
    </div>
  );

  return (
    <Layout
      header={t('Recommendations')}
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default Recommendations;
