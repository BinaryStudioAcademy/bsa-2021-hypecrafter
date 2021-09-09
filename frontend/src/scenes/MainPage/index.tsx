import { FC, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Routes } from '../../common/enums';
import { Project } from '../../common/types';
import Button from '../../components/Button';
import Chart from '../../components/Chart';
import LoaderWrapper from '../../components/LoaderWrapper';
import ProjectCard from '../../components/ProjectCard';
import Seo from '../../components/Seo';
import { calcDonationProgress } from '../../helpers/project';
import { useAuth, useTypedSelector } from '../../hooks';
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
    isLoading: isStartupsLoading,
    topics
  } = useTypedSelector(({ mainPage }) => ({
    popular: mainPage.popular,
    recommended: mainPage.recommended,
    isLoading: mainPage.isLoading,
    topics: mainPage.topics
  }));
  useEffect(() => {
    fetchPopularAndRecommendedProjectsAction();
    fetchTopics();
  }, []);

  const renderChart = () => {
    const labels: string[] = [];
    const data: number[] = [];
    topics.forEach((topic) => {
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

  const CreateHelpBtns = () => {
    const { isAuthorized } = useAuth();
    const createProjectLink = isAuthorized
      ? Routes.PROJECTS_CREATE
      : Routes.LOGIN;
    const HelpProjectLink = Routes.PROJECTS;
    const style = { textDecoration: 'none' };

    return (
      <>
        <NavLink to={createProjectLink} style={style}>
          <Button type="button">{t('Create project')}</Button>
        </NavLink>
        <NavLink to={HelpProjectLink} style={style}>
          <Button type="button" variant="primary" outline>
            {t('Help project')}
          </Button>
        </NavLink>
      </>
    );
  };
  return (
    <div className={classes.root}>
      <Seo title="HypeCrafter" description="" />

      <section className={classes.main}>
        <div className={classes['main-text']}>
          <div className={classes['main-logo-text']}>
            <div>
              <span className={classes.logo}>HypeCrafter </span>
              {t('faithful assistant')}
            </div>
          </div>
          <div className={classes['logo-text']}>
            {t('Do you have a good ...')}
          </div>
          <div className={classes.buttons}>
            <CreateHelpBtns />
          </div>
        </div>
        <div className={classes['main-bg']} />
      </section>
      <div className={classes.content}>
        <section>
          <div className={classes.category}>
            <Link to="/projects?sort=popular">{t('Popular startups')}</Link>
          </div>
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
                  image={
                    project.imageUrl
                    || 'https://source.unsplash.com/random/800x600'
                  }
                />
              ))}
            </LoaderWrapper>
          </div>
        </section>
        <section>
          <div className={classes.category}>
            <Link to="/projects?sort=recommended">
              {t('Recommended for you')}
            </Link>
          </div>
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
                  image={
                    project.imageUrl
                    || 'https://source.unsplash.com/random/800x600'
                  }
                />
              ))}
            </LoaderWrapper>
          </div>
        </section>
        <section>
          <div className={classes.category}>{t('Interesting topics')}</div>
          <div className={classes.chart}>{topics && renderChart()}</div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
