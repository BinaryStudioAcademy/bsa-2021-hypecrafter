import { FC, useEffect } from 'react';
import { Project } from '../../common/types';
import Button from '../../components/Button';
import Chart from '../../components/Chart';
import LoaderWrapper from '../../components/LoaderWrapper';
import ProjectCard from '../../components/ProjectCard';
import { calcDonationProgress } from '../../helpers/project';
import { useTypedSelector } from '../../hooks';
import { useAction } from '../../hooks/useAction';
import { useLocalization } from '../../providers/localization';
import classes from './styles.module.scss';
import { makeChartProps } from './utils';

const MainPage: FC = () => {
  const { t } = useLocalization();
  const { fetchPopularAndRecommendedProjectsAction, fetchTopics } = useAction();
  const {
    popular: popularStartups,
    recommended: recommendedStartups,
    isLoading: isStartupsLoading, topics } = useTypedSelector(
    (
      { mainPage }
    ) => ({
      popular: mainPage.popular,
      recommended: mainPage.recommended,
      isLoading: mainPage.isLoading,
      topics: mainPage.topics
    })
  );
  useEffect(() => {
    fetchPopularAndRecommendedProjectsAction();
    fetchTopics();
  }, []);

  const renderChart = () => {
    const labels: string[] = [];
    const data: number[] = [];
    topics.forEach(topic => {
      labels.push(topic.name);
      data.push(topic.sum);
    });
    const defaultProps = makeChartProps(labels, data);

    return (
      <Chart
        type="bar"
        labels={defaultProps.data.labels}
        dataSets={defaultProps.data.datasets}
        options={defaultProps.options}
        fontSize={20}
        width="100%"
        height="300px"
      />
    );
  };

  return (
    <div className={classes.root}>
      <section className={classes.main}>
        <div className={classes['main-text']}>
          <div className={classes['main-logo-text']}>
            <div>
              <span className={classes.logo}>
                HypeCrafter
              </span> {t('faithful assistant')}
            </div>
          </div>
          <div className={classes['logo-text']}>
            {t('Do you have a good ...')}
          </div>
          <div className={classes.buttons}>
            <Button type="button">{t('Create Project')}</Button>
            <Button type="button" variant="primary" outline>{t('Help Project')}</Button>
          </div>
        </div>
        <div className={classes['main-bg']} />
      </section>
      <div className={classes.content}>
        <section>
          <div className={classes.category}>{t('Popular startups')}</div>
          <div className={classes.cards}>
            <LoaderWrapper isLoading={isStartupsLoading}>
              {popularStartups?.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  to={`/projects/${project.id}`}
                  category={project.category}
                  tags={project.tags}
                  name={project.name}
                  description={project.description}
                  goal={project.goal}
                  percent={calcDonationProgress(project.donated, project.goal)}
                  image="https://source.unsplash.com/random/800x600"
                />
              ))}
            </LoaderWrapper>
          </div>
        </section>
        <section>
          <div className={classes.category}>{t('Recommended for you')}</div>
          <div className={classes.cards}>
            <LoaderWrapper isLoading={isStartupsLoading}>
              {recommendedStartups?.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  to={`/projects/${project.id}`}
                  category={project.category}
                  tags={project.tags}
                  name={project.name}
                  description={project.description}
                  goal={project.goal}
                  percent={calcDonationProgress(project.donated, project.goal)}
                  image="https://source.unsplash.com/random/800x600"
                />
              ))}
            </LoaderWrapper>
          </div>
        </section>
        <section>
          <div className={classes.category}>{t('Interesting topics')}</div>
          <div className={classes.chart}>
            {topics && renderChart()}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
