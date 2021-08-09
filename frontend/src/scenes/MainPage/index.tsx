import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTypedSelector } from '../../hooks';
import { fetchPopularAndRecommendedProjectsAction } from './actions';
import classes from './styles.module.scss';
import Button from '../../components/Button';
import ProjectCard from '../../components/ProjectCard';
import Chart from '../../components/Chart';
import defaultProps from './chartProps';
import { useLocalization } from '../../providers/localization';

const MainPage: FC = () => {
  const { t } = useLocalization();
  const dispatch = useDispatch();
  const { popular: popularStartups, recommended: recommendedStartups, isLoading: isStartupsLoading } = useTypedSelector(
    (
      { projects: { popular, recommended, isLoading } }
    ) => ({
      popular, recommended, isLoading
    })
  );
  useEffect(() => {
    dispatch(fetchPopularAndRecommendedProjectsAction());
  }, [dispatch]);

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
            <Button type="button" variant="primary" isOutline>{t('Help Project')}</Button>
          </div>
        </div>
        <div className={classes['main-bg']} />
      </section>
      <div className={classes.content}>
        <section>
          <div className={classes.category}>{t('Popular startups')}</div>
          <div className={classes.cards}>
            {isStartupsLoading ? <Spinner animation="border" /> : popularStartups.map(project => (
              <ProjectCard
                key={project.id}
                to="/"
                category={project.category}
                tags={project.tags}
                name={project.name}
                description={project.description}
                goal={project.goal}
                percent={project.percent}
                image={project.image}
              />
            ))}
          </div>
        </section>
        <section>
          <div className={classes.category}>{t('Recommended for you')}</div>
          <div className={classes.cards}>
            {isStartupsLoading ? <Spinner animation="border" /> : recommendedStartups.map(project => (
              <ProjectCard
                key={project.id}
                to="/"
                category={project.category}
                tags={project.tags}
                name={project.name}
                description={project.description}
                goal={project.goal}
                percent={project.percent}
                image={project.image}
              />
            ))}
          </div>
        </section>
        <section className={classes.chart}>
          <div className={classes.category}>{t('Interesting topics')}</div>
          <Chart type="bar" labels={defaultProps.data.labels} dataSets={defaultProps.data.datasets} />
        </section>
      </div>
    </div>
  );
};

export default MainPage;
